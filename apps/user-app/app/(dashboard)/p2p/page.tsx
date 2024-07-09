import { getServerSession } from "next-auth";
import { BalanceCard } from "../../../components/BalanceCard";
import { SendCard } from "../../../components/SendCard";
import prisma from "@repo/db/client";
import { authOptions } from "../../lib/auth";
import { P2PTransactions } from "../../../components/p2pTransactions";

async function getBalance() {
    const session = await getServerSession(authOptions);
    const balance = await prisma.balance.findFirst({
        where: {
            userId: Number(session?.user?.id),
        },
    });
    return {
        amount: balance?.amount || 0,
        locked: balance?.locked || 0,
    };
}
async function getP2pTransactions() {
    const session = await getServerSession(authOptions);
    const txns = await prisma.p2pTransfer.findMany({
        where: {
            fromUserId: Number(session?.user?.id),
        },
        include: {
            toUser: {
                select: {
                    name: true, // Selecting only the name field from the related toUser
                },
            },
        },
    });

    return txns.map((t) => ({
        time: t.timestamp,
        amount: t.amount,
        toUser: t.toUser.name || "",
    }));
}

export default async function () {
    const balance = await getBalance();
    const transactions = await getP2pTransactions();
    return (
        <div className="w-screen">
            <div className="text-4xl text-[#6a51a6] pt-8 mb-8 font-bold">
                Peer to Peer Transfer
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 p-4">
                <div>
                    <SendCard />
                </div>
                <div>
                    <BalanceCard
                        amount={balance.amount}
                        locked={balance.locked}
                    />
                    <div className="pt-4">
                        <P2PTransactions transactions={transactions} />
                    </div>
                </div>
            </div>
        </div>
    );
}
