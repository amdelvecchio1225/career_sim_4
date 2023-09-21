import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
    const tony = await prisma.user.upsert({
        where: { username: 'tonebone' },
        update: {},
        create: {
            username: 'tonebone',
            password: 'thegreatestpassword',
            posts: {
                create: {
                    title: "My First Post!",
                    content: "This is the post of all time!!"
                },
            },
        },
    });

    const ben = await prisma.user.upsert({
        where: { username: 'benrules' },
        update: {},
        create: {
            username: 'benrules',
            password: 'bensawesomepassword',
            posts: {
                create: {
                    title: "Ben's First Post",
                    content: "Way better than Tony's"
                },
            },
        },
    });

    const chris = await prisma.user.upsert({
        where: { username: 'notourchris' },
        update: {},
        create: {
            username: 'notourchris',
            password: 'tenoutoftenpassword',
            posts: {
                create: {
                    title: "huh",
                    content: "why did i even sign up for this"
                },
            },
        },
    });
    console.log({tony, ben, chris})
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (err) => {
        console.error(err);
        await prisma.$disconnect();
        process.exit(1);
    })