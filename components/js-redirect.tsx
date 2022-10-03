type Props = {
  href: string
}

export default function JsRedirect({ href }: Props) {
  if (typeof window !== "undefined") {
    window.location.href = href;
  }

  return <a href={href}>Click this if you are not being redirected.</a>;
}
