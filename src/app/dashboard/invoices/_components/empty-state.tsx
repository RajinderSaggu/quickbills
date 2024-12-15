import { buttonVariants } from "@/components/ui/button";
import { Ban, PlusCircle } from "lucide-react";
import Link from "next/link";

interface EmptyStateProps {
  title: string;
  description: string;
  buttontext: string;
  href: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  description,
  buttontext,
  href,
}) => {
  return (
    <div className="flex flex-col flex-1 h-full items-center justify-center rounded-md border-2 border-dashed p-8 text-center animate-in fade-in-50">
      <div className="flex items-center justify-center w-20 h-20 rounded-full bg-primary/10">
        <Ban className="w-10 h-10 text-primary" />
      </div>
      <h2 className="mt-6 text-xl font-semibold">{title}</h2>
      <p className="mb-8 mt-2 text-sm text-muted-foreground max-w-md mx-auto text-center">
        {description}
      </p>
      <Link href={href} className={buttonVariants()}>
        <PlusCircle className="w-4 h-4 mr-2" /> {buttontext}
      </Link>
    </div>
  );
};

export default EmptyState;
