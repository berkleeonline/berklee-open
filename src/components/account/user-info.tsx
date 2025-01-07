import React from "react";
import { useAuthenticator } from "@aws-amplify/ui-react";
import { Avatar, Button, Link } from "@nextui-org/react";

export default function UserInfo() {
  const { user } = useAuthenticator((context) => [context.user]);

  return (
    <div className="flex items-start">
      <Avatar
        isBordered
        as="button"
        className="transition-transform mr-4 w-16 h-16"
        src="/images/berklee_open_avatar.svg"
      />
      <div>
        <h1 className="text-3xl font-bold mb-4 text-left">
          {user ? user.username : "Guest"}
        </h1>
        <Button
          href={`/account`}
          as={Link}
          radius="full"
          isExternal
          className="font-bold w-41 hover:bg-slate-100 mb-2"
          variant="bordered"
          aria-label="Edit Account"
        >
          Edit Account Settings
        </Button>
      </div>
    </div>
  );
}
