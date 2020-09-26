import React from "react";
import Menu from "./Menu";

interface BaseProps  {
  title: string,
  description: string,
  className?: string,
  children: React.ReactNode
}

const Base: React.FC<BaseProps> = ({
  title = "My Title",
  description = "My desription",
  className = "bg-dark text-white",
  children,
}) => (
  <div>
    <Menu />
    <div className="container-fluid bg-dark" style={{height: "100vh"}}>
      <div className="bg-dark text-white text-center">
        <h2 className="display-4">{title}</h2>
        <p className="lead">{description}</p>
      </div>
      <div className={className}>{children}</div>
    </div>
  </div>
);

export default Base;
