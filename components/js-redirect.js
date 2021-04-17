export default function JsRedirect({ href }) {
  if (typeof window !== "undefined") {
    window.location = href;
  }

  return <a href={href}>Click this if you are not being redirected.</a>;
}
