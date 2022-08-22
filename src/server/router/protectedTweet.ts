import * as trpc from "@trpc/server";
import { z } from "zod";
import { createProtectedRouter } from "./protected-router";

export const protectedTweetRouter = createProtectedRouter()
  .mutation("postReply", {
    input: z.object({
      parentId: z.string().optional(),
      message: z.string(),
    }),
    async resolve({ input, ctx }) {
      return await ctx.prisma.reply
        .create({
          data: {
            message: input.message,
            parentId: input.parentId,
            userId: ctx.session.user.id!,
          },
        })
        .then((reply) => {
          return {
            ...reply,
            likeCount: 0,
            likedByMe: false,
          };
        });
    },
  })
  .mutation("updateReply", {
    input: z.object({
      replyId: z.string(),
      message: z.string(),
    }),
    async resolve({ input, ctx }) {
      const res = await ctx.prisma.reply.findUnique({
        where: { id: input.replyId },
        select: { userId: true },
      });

      if (res?.userId !== ctx.session.user.id) {
        throw new trpc.TRPCError({
          code: "UNAUTHORIZED",
          message: "You do not have permission to update this comment",
        });
      }

      return await ctx.prisma.reply.update({
        where: {
          id: input.replyId,
        },
        data: {
          message: input.message,
        },
      });
    },
  })
  .mutation("deleteReply", {
    input: z.object({
      replyId: z.string(),
    }),
    async resolve({ input, ctx }) {
      const res = await ctx.prisma.reply.findUnique({
        where: { id: input.replyId },
        select: { userId: true },
      });

      if (res?.userId !== ctx.session.user.id) {
        throw new trpc.TRPCError({
          code: "UNAUTHORIZED",
          message: "You do not have permission to delete this comment",
        });
      }

      return await ctx.prisma.reply.delete({
        where: {
          id: input.replyId,
        },
      });
    },
  })
  .mutation("toggleLike", {
    input: z.object({
      replyId: z.string(),
    }),
    async resolve({ input, ctx }) {
      const res = await ctx.prisma.reply.findUnique({
        where: { id: input.replyId },
        select: { userId: true },
      });

      const like = await ctx.prisma.like.findUnique({
        where: {
          userId_replyId: {
            replyId: input.replyId,
            userId: ctx.session.user.id!,
          },
        },
      });

      if (like === null) {
        return await ctx.prisma.like
          .create({
            data: {
              replyId: input.replyId,
              userId: ctx.session.user.id!,
            },
          })
          .then(() => {
            return { addLike: true };
          });
      } else {
        return await ctx.prisma.like
          .delete({
            where: {
              userId_replyId: {
                replyId: input.replyId,
                userId: ctx.session.user.id!,
              },
            },
          })
          .then(() => {
            return { addLike: false };
          });
      }
    },
  });
