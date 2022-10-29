import Link from "next/link";
import classes from "./button.module.css";

const Button = (props) => {
  return (
    <Link href={props.link}>
      <button className={classes.btn}>{props.children}</button>
    </Link>
  );
};
export default Button;
