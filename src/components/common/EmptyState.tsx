import React from "react";
import Button from "./Button";
import Link from "next/link";

interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description: string;
  actionText?: string;
  actionHref?: string;
  onActionClick?: () => void;
}

export default function EmptyState({
  icon,
  title,
  description,
  actionText,
  actionHref,
  onActionClick,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center text-center p-12 bg-[#131518]/60 border border-[#23272F] rounded-sm my-6">
      {icon && (
        <div className="w-16 h-16 rounded-full bg-[#1A1D22] border border-[#2A2E35] flex items-center justify-center text-[#D4AF37] mb-5">
          {icon}
        </div>
      )}
      <h3 className="font-serif text-2xl text-[#FBFBFD] font-light mb-2">
        {title}
      </h3>
      <p className="text-gray-400 max-w-md text-sm font-sans mb-6">
        {description}
      </p>
      {actionText && (
        <>
          {actionHref ? (
            <Link href={actionHref}>
              <Button variant="gold" size="md">
                {actionText}
              </Button>
            </Link>
          ) : (
            <Button variant="gold" size="md" onClick={onActionClick}>
              {actionText}
            </Button>
          )}
        </>
      )}
    </div>
  );
}
