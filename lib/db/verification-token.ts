import { prisma } from "../prisma";
import { v4 as uuidv4 } from "uuid";
export async function getVerificationTokenByEmail(email: string) {
  try {
    return await prisma.verificationToken.findFirst({
      where: {
        email,
      },
    });
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function getVerificationTokenByToken(token: string) {
  try {
    return await prisma.verificationToken.findUnique({
      where: {
        token,
      },
    });
  } catch (error) {
    console.error(error);
    return null;
  }
}

export const generateVerificationToken = async (email: string) => {
  const tokenExists = await getVerificationTokenByEmail(email);
  if (tokenExists) {
    try {
      await prisma.verificationToken.delete({
        where: {
          token: tokenExists.token,
        },
      });
    } catch (error) {
      console.error(error);
      return null;
    }
  }
  const token = uuidv4();
  const expires = new Date(Date.now() + 3600 * 1000); //* 1 hour from now
  try {
    await prisma.verificationToken.create({
      data: {
        email,
        token,
        expires: expires,
      },
    });
    return token;
  } catch (error) {
    console.error(error);
    return null;
  }
};
