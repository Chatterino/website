import { ReactNode } from "react";

type CalloutType = "note" | "warning";
type Props = {
  type: "note";
  children: ReactNode;
};

function configFor(type: CalloutType): {
  title: string;
  borderColor: string;
  textColor: string;
  icon: ReactNode;
} {
  switch (type) {
    case "note":
      return {
        title: "Note",
        borderColor: "border-blue-500",
        textColor: "text-blue-500",
        icon: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M11,9H13V7H11M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M11,17H13V11H11V17Z" />
          </svg>
        ),
      };
    case "warning":
      return {
        title: "Warning",
        borderColor: "border-orange-500",
        textColor: "text-orange-500",
        icon: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M12,2L1,21H23M12,6L19.53,19H4.47M11,10V14H13V10M11,16V18H13V16" />
          </svg>
        ),
      };
  }
}

export default function Callout({ type, children }: Props) {
  const { title, borderColor, textColor, icon } = configFor(type);
  return (
    <div className={"border-l-4 px-3 py-1 my-4 " + borderColor}>
      <div className={"inline-flex gap-2 " + textColor}>
        {icon} {title}
      </div>
      <div>{children}</div>
    </div>
  );
}
