const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
  const project = await prisma.project.create({
    data: {
      title: 'Test Project',
      description: 'Ini project hasil test Prisma',
      tech: 'Node.js · Prisma · PostgreSQL',
      githubUrl: 'https://github.com/test/test',
    },
  })

  console.log('Project created:', project)
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect()
  })
