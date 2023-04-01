import { TRPCError } from '@trpc/server';
import slugify from 'slugify';
import {z} from "zod";
import {tagCreateSchema} from '@/components/screen/tag/tagForm';
import { protectedProcedure, createTRPCRouter} from "@/server/api/trpc";


export const tagRouter = createTRPCRouter({
    createTag: protectedProcedure.input(tagCreateSchema).mutation(
        async ({ ctx: {prisma}, input})=>{
            const tag = await prisma.tag.findUnique(
                {
                    where:{
                        name: input.name,
                    }
                }
            );

            if(tag){
                throw new TRPCError({
                    code:"CONFLICT",
                    message: "tag already exists!"
                });
            }

            await prisma.tag.create({
                data:{
                    ...input,
                    slug: slugify(input.name)
                }
            });
        }
    ),
    getTags: protectedProcedure.query(async ({
        ctx: {prisma}
    })=>{
        return await prisma.tag.findMany();
    })
})

