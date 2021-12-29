import React, { useState } from "react";
import ReactDOM from "react-dom";

interface RenderParams {
  mouseX: number;
  mouseY: number;
  target?: EventTarget;
}

interface TooltipProps {
  children?: React.ReactNode;
  wrapper?: JSX.Element;
  render: (params: RenderParams) => JSX.Element;
}

const Tooltip = ({ children, wrapper, render }: TooltipProps) => {
  let Wrapper = wrapper || <div />;
  const [visible, setVisible] = useState(false);
  const [renderParams, setRenderParams] = useState<RenderParams>({
    mouseX: 0,
    mouseY: 0,
  });

  const eventHandlers: Record<string, React.MouseEventHandler> = {
    onMouseOver: (e) => {
      if (visible) return;
      setVisible(true);
      setRenderParams({
        mouseX: e.clientX,
        mouseY: e.clientY,
        target: e.target,
      });
    },
    onMouseMove: (e) => {
      setRenderParams({
        mouseX: e.clientX,
        mouseY: e.clientY,
        target: e.target,
      });
    },
    onMouseOut: (e) => {
      setVisible(false);
    },
  };

  Wrapper = React.cloneElement(Wrapper, { children, ...eventHandlers });

  return (
    <>
      {Wrapper}
      {visible
        ? ReactDOM.createPortal(
            render(renderParams),
            document.getElementById("root")!
          )
        : null}
    </>
  );
};

export default Tooltip;
