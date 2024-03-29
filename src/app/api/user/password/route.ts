import client from "@/lib/prisma";
import apiErrorHandler, { ApiError } from "@/utils/apiErrorHandler";
import bcrypt from "bcrypt";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/options";
import { errResponse } from "@/utils/helpers";

export const PATCH = apiErrorHandler(async (req: Request) => {
  const session = await getServerSession(authOptions);
  if (!session)
    throw new ApiError(
      "Not Authorized",
      { title: "Not Authorized", description: "Please login" },
      401
    );

  const { passwordOld, passwordNew } = await req.json();

  if (!passwordNew)
    return errResponse(
      "Invalid Request",
      {
        title: "New password is empty",
        description: "Please provide a new password",
        field: `passwordNew`,
      },
      400
    );

  const user = await client.user.findUnique({
    where: {
      username: session.user.username,
    },
  });

  if (user && user.password) {
    if (!passwordOld)
      return errResponse(
        "Invalid Request",
        {
          title: "Old password is empty",
          description: "Please provide the old password",
          field: `passwordOld`,
        },
        400
      );
    const isPasswordOldValid = await bcrypt.compare(passwordOld, user.password);
    if (!isPasswordOldValid)
      return errResponse(
        "Invalid Password",
        {
          title: "Old password is incorrent",
          description: "Please provide a valid password",
          field: `passwordOld`,
        },
        400
      );
  }

  const hashPass = await bcrypt.hash(passwordNew, 12);

  const updatedUser = await client.user.update({
    where: {
      username: session.user.username,
    },
    data: {
      password: hashPass,
    },
  });

  return NextResponse.json("Password updated successfully", { status: 200 });
});
