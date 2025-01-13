import { prisma } from "@/lib/prisma";
import React from "react";
import {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
} from "@/components/ui/table";
import { auth } from "@/auth";
import { notFound } from "next/navigation";

const Admin = async () => {
  const session = await auth();
  if (!session || !session.user || session.user.role !== "ADMIN") {
    notFound();
  }
  const users = await prisma.user.findMany();
  const numOfUsers = await prisma.user.count();
  return (
    <div className="mt-20 bg-background text-foreground">
      <h1>Admin</h1>
      <Table>
        <TableCaption>List of Users</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Created At</TableHead>
            <TableHead>Updated At</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.role}</TableCell>
              <TableCell>
                {new Date(user.createdAt).toLocaleDateString()}
              </TableCell>
              <TableCell>
                {new Date(user.updatedAt).toLocaleDateString()}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={5}>Total Users: {numOfUsers}</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
};

export default Admin;
