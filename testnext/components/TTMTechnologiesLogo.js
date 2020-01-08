import TTMLogo from "../public/ttmvectorlogoblue.svg"

const TTMTechnologiesLogo = ({style}) => <div style={{
  ...style,
  background: `url(${TTMLogo})`,
  backgroundSize: "contain",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center",
}}/>

export default TTMTechnologiesLogo