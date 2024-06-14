import { useEffect, useState } from "react";
import { createPortal } from "react-dom";


type PortalProps = {
  id: string;
  children: React.ReactNode;
};
const Portal = (props: PortalProps) => {
  const { id, children } = props;
  const [container, setContainer] = useState<HTMLElement>();

  useEffect(() => {
    if (id) {
      const portalContainer = document.getElementById(id);

      if (!portalContainer) {
        throw new Error('Портал отказал');
      }

      setContainer(portalContainer);
    }
  }, [id]);

  return container ? createPortal(children, container) : null;
};

export default Portal;