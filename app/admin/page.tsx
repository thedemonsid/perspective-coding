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
  const users = await prisma.user.findMany({
    include: {
      USerToSub: {
        include: {
          subscription: true,
        },
      },
    },
  });
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
            <TableHead>Subscription Status</TableHead>
            <TableHead>Subscription Ends</TableHead>
            <TableHead>Price Paid</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => {
            const activeSubscription = user.USerToSub.find(
              (sub) =>
                sub.status === "ACTIVE" && new Date(sub.expiresAt) > new Date()
            );
            return (
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
                <TableCell>
                  {activeSubscription ? "Active" : "Inactive"}
                </TableCell>
                <TableCell>
                  {activeSubscription
                    ? new Date(
                        activeSubscription.expiresAt
                      ).toLocaleDateString()
                    : "N/A"}
                </TableCell>
                <TableCell>
                  {activeSubscription
                    ? activeSubscription.subscription.price
                    : "N/A"}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={8}>Total Users: {numOfUsers}</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
};

export default Admin;
