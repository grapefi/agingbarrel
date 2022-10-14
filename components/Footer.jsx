import Image from "next/image";

export default function Footer() {
  return (
    <div className="footer">
      <div>
        <span className="footer-title flex justify-center pt-2">
          Copyright © Vintage Aging Barrel |{" "}
          <a
            className="ml-2 underline"
            href="https://grapefinance.app"
            target="_blank"
            rel="noreferrer"
          >
            {" "}
            Grape Finance
          </a> | 
          <a
            className="ml-2 underline"
            href="https://grape-finance.gitbook.io/grape-finance-docs/unique-features/xgrape-grapevine/soda-press"
            target="_blank"
            rel="noreferrer"
          >
            Docs
          </a>
        </span>
      </div>
      <div className="flex justify-center gap-3 mt-5">
        <a
          href="https://twitter.com/grape_finance"
          rel="noopener noreferrer"
          target="_blank"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="#fff"
            width="25"
            height="20"
            viewBox="0 0 25 20.305"
          >
            <path
              d="M22.43,8.441c.016.222.016.444.016.666A14.478,14.478,0,0,1,7.868,23.685,14.479,14.479,0,0,1,0,21.385a10.6,10.6,0,0,0,1.237.063A10.261,10.261,0,0,0,7.6,19.26a5.133,5.133,0,0,1-4.791-3.553,6.461,6.461,0,0,0,.968.079,5.419,5.419,0,0,0,1.348-.174,5.124,5.124,0,0,1-4.109-5.029v-.063a5.16,5.16,0,0,0,2.316.65A5.131,5.131,0,0,1,1.745,4.317,14.564,14.564,0,0,0,12.31,9.678,5.784,5.784,0,0,1,12.183,8.5,5.129,5.129,0,0,1,21.05,5,10.088,10.088,0,0,0,24.3,3.761a5.11,5.11,0,0,1-2.253,2.824A10.272,10.272,0,0,0,25,5.792a11.014,11.014,0,0,1-2.57,2.649Z"
              transform="translate(0 -3.381)"
            />
          </svg>{" "}
        </a>
        <a
          href="https://t.me/GrapeDefi"
          rel="noopener noreferrer"
          target="_blank"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="25"
            height="20"
            fill="#fff"
            viewBox="0 0 25 20.966"
          >
            <path
              d="M24.93,6.437,21.157,24.229c-.285,1.256-1.027,1.568-2.082.977l-5.748-4.236-2.774,2.668A1.444,1.444,0,0,1,9.4,24.2l.413-5.854L20.465,8.719c.463-.413-.1-.642-.72-.229L6.574,16.784.9,15.009c-1.233-.385-1.256-1.233.257-1.825L23.339,4.64C24.366,4.255,25.265,4.869,24.93,6.437Z"
              transform="translate(-0.001 -4.528)"
            />
          </svg>{" "}
        </a>
        <a
          href="https://discord.gg/grapefinance"
          rel="noopener noreferrer"
          target="_blank"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="#fff"
            width="25"
            height="25"
            viewBox="0 0 30.625 35"
          >
            <path d="M20.318,16.625a1.791,1.791,0,1,1-1.785-1.942A1.864,1.864,0,0,1,20.318,16.625Zm-8.173-1.942a1.949,1.949,0,0,0,0,3.885,1.864,1.864,0,0,0,1.785-1.942A1.853,1.853,0,0,0,12.145,14.683ZM30.625,3.605V35c-4.409-3.9-3-2.606-8.12-7.368l.927,3.238H3.588A3.6,3.6,0,0,1,0,27.265V3.605A3.6,3.6,0,0,1,3.588,0h23.45A3.6,3.6,0,0,1,30.625,3.605ZM25.637,20.2a23.435,23.435,0,0,0-2.52-10.2A8.654,8.654,0,0,0,18.2,8.155l-.245.28a11.647,11.647,0,0,1,4.358,2.223A14.87,14.87,0,0,0,9.24,10.15c-.648.3-1.032.507-1.032.507a11.806,11.806,0,0,1,4.6-2.292l-.175-.21A8.654,8.654,0,0,0,7.717,9.993,23.435,23.435,0,0,0,5.2,20.2a6.345,6.345,0,0,0,5.338,2.66s.648-.788,1.173-1.452a5.443,5.443,0,0,1-3.063-2.065c.257.18.682.414.717.438a12.756,12.756,0,0,0,10.92.612A10.014,10.014,0,0,0,22.3,19.355a5.522,5.522,0,0,1-3.168,2.083c.525.665,1.155,1.418,1.155,1.418A6.4,6.4,0,0,0,25.637,20.2Z" />
          </svg>{" "}
        </a>
      </div>
    </div>
  );
}
