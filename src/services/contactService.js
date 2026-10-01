import { read, write, simulateLatency, createId, ServiceError } from './storage'
import { validateContact, hasErrors } from '../utils/validation'

const MESSAGES = 'messages'

export async function sendMessage(input) {
  const errors = validateContact(input)
  if (hasErrors(errors)) throw new ServiceError('Please check the highlighted fields.', errors)
  await simulateLatency()

  const message = {
    id: createId(),
    name: input.name.trim(),
    email: input.email.trim(),
    subject: input.subject,
    message: input.message.trim(),
    createdAt: new Date().toISOString(),
  }
  write(MESSAGES, [message, ...read(MESSAGES, [])])
  return message
}
