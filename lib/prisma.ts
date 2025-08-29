// This file is deprecated - import PrismaClient directly in each file
// Example: import { PrismaClient } from "@/lib/generated/prisma"
//          const prisma = new PrismaClient()

import { PrismaClient } from "@/lib/generated/prisma";

// Using a single instance is better for performance
// but for now we're using direct imports in each file
const prisma = new PrismaClient();

export default prisma;
