
import { getAuthSession } from '@/app/lib/auth'
import { db } from '@/app/lib/db'
import { ContentValidator } from '@/app/lib/validators/content'
import { z } from 'zod'

export async function POST(req: Request) {
  try {
    const body = await req.json()

    const { title, content } = ContentValidator.parse(body)

    const session = await getAuthSession()

    if (!session?.user) {
      return new Response('Unauthorized', { status: 401 })
    }

    // verify user is subscribed to passed subreddit id
   


    await db.resume.create({
      data: {
        title,
        content,
        authorId: session.user.id,
      },
    })

    return new Response('OK')
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(error.message, { status: 400 })
    }

    return new Response(
      'Could not create resume at this time. Please try later',
      { status: 500 }
    )
  }
}
