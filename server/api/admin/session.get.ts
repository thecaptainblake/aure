import { adminSession } from '../../utils/adminAuth'

export default defineEventHandler((event) => adminSession(event))