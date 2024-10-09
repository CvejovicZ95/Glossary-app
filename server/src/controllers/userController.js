import { User } from '../models/usersSchema.js'
import { logger } from '../../logger.js'
import { generateToken } from '../utils/generateToken.js'
import { sendOrderConfirmation } from '../../mailgun.js'
import bcrypt from 'bcrypt'

export const registerUser = async (req, res) => {
  try {
    const { email, username, password } = req.body

    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return res.status(400).json({ error: 'Email is already taken' })
    }

    const existingUsername = await User.findOne({ username })
    if (existingUsername) {
      return res.status(400).json({ error: 'Username is already taken' })
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const newUser = new User({
      email,
      username,
      password: hashedPassword
    })

    await newUser.save()

    const registrationDetails = `
      <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: auto; border: 1px solid #ddd; padding: 20px; border-radius: 10px;">
          <h2 style="color: #2e6da4; border-bottom: 2px solid #2e6da4; padding-bottom: 10px;">Thank You for Registering!</h2>
          <p>Dear <strong>${username}</strong>,</p>
          <p>Your registration on Glossary App has been successfully completed. We are excited to have you join our team!</p>
          <h3 style="color: #2e6da4; margin-top: 20px;">Your Details:</h3>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Username:</strong> ${username}</p>
          <h3 style="color: #2e6da4; margin-top: 20px;">What's Next?</h3>
          <p>You can now log in using your username and password. Once logged in, you can create, edit, and delete terms.</p>
          <p>If you have any questions, feel free to contact us.</p>
          <h3 style="color: #2e6da4; text-align: center;">Glossary App Team</h3>
      </div>
    `

    await sendOrderConfirmation({ email: newUser.email, details: registrationDetails })

    logger.info(`${newUser.username} registered as new user successfully`)

    res.status(201).json({ message: 'User registered successfully', user: newUser })
  } catch (error) {
    logger.error('Error during user registration process', error.message)
    res.status(500).json({ message: 'Server error', error: error.message })
  }
}

export const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body
    const user = await User.findOne({ username })

    if (!user) {
      logger.error('User not found')
      return res.status(400).json({ error: 'Incorrect username or password' })
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password)

    if (!isPasswordCorrect) {
      logger.error('Incorrect password')
      return res.status(400).json({ error: 'Incorrect username or password' })
    }

    const token = generateToken(user._id, res)

    logger.info(`${username} logged in successfully`)
    res.status(200).json({
      token,
      username: user.username,
      id: user._id
    })
  } catch (error) {
    logger.error('Error in loginUser controller', error.message)
    res.status(500).json({ message: 'Server error', error: error.message })
  }
}

export const logoutUser = async (req, res) => {
  try {
    logger.info('User logged out successfully')
    res.cookie('token', '', { maxAge: 0 })
    res.status(200).json({ message: 'Logged out' })
  } catch (error) {
    logger.error('Error in logoutUser controller', error.message)
    res.status(500).json({ message: 'Server error', error: error.message })
  }
}
