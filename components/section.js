function Section({ children, ...other }) {
  return (
    <div {...other}>
      <div className="grid">
        <div className="max-w-screen-xl place-self-center">{children}</div>
      </div>
    </div>
  );
}

export default Section;
