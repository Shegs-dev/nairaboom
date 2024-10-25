import { Head, Html, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
        <link rel="shortcut icon" href="/Nairaboom-Thumbnail.png" />{" "}
        {/* Add the Notix CDN script tag here */}{" "}
        <script src="https://cdn.notix.io/notix.min.js" async>
          {" "}
        </script>{" "}
        <script
          async
          type="text/javascript"
          src="https://sdk.monnify.com/plugin/monnify.js"
        ></script>{" "}
        {/* <script id="script">
                      var s = document.createElement("script") s.src =
                      "https://notix.io/ent/current/enot.min.js" s.onload = function (sdk){" "}
                      {sdk.startInstall({
                        appId: "1005c73b664902bbe55d52beccb4604",
                        loadSettings: true,
                      })}
                      document.head.append(s)
                    </script> */}{" "}
        {/* <script id="script">
            	var s = document.createElement("script")
            	s.src = "https://notix.io/ent/current/enot.min.js"
            	s.onload = function (sdk) {
            		sdk.startInstall(
            			{
            				"appId": "1005c73b664902bbe55d52beccb4604",
            				"loadSettings": true
            			}
            		)
            	}
            	document.head.append(s)
            </script> */}{" "}
        {/* <script
                      id="script"
                      dangerouslySetInnerHTML={{
                        __html: `
                      var s = document.createElement("script");
                      s.src = "https://notix.io/ent/current/enot.min.js";
                      s.onload = function (sdk) {
                        sdk.startInstall({
                          "appId": "1005c73b664902bbe55d52beccb4604",
                          "loadSettings": true
                        });
                      };
                      document.head.appendChild(s);
                    `,
                      }}
                    /> */}{" "}
        {/* Google Analytics Script2 */}{" "}
        {/* <script
                      async
                      src="https://www.googletagmanager.com/gtag/js?id=G-QDS13J8SEJ"
                      strategy="afterInteractive"
                    />
                    <script strategy="afterInteractive">
                      {`
                          window.dataLayer = window.dataLayer || [];
                          function gtag(){dataLayer.push(arguments);}
                          gtag('js', new Date());
                          gtag('config', 'G-QDS13J8SEJ');
                        
                        `}
                    </script> */}{" "}
        <script
          type="text/javascript"
          dangerouslySetInnerHTML={{
            __html: `
              var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
              (function(){
              var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
              s1.async=true;
              s1.src='https://embed.tawk.to/65e087d38d261e1b5f66ee0a/1hnqh55p1';
              s1.charset='UTF-8';
              s1.setAttribute('crossorigin','*');
              s0.parentNode.insertBefore(s1,s0);
              })();
            `,
          }}
        />
        <script
          id="script"
          type="text/javascript"
          dangerouslySetInnerHTML={{
            __html: `
              var s = document.createElement("script");
              s.src = "https://notix.io/ent/current/enot.min.js";
              s.onload = function (sdk) {
                sdk.startInstall({
                  appId: "1005c73b664902bbe55d52beccb4604",
                  loadSettings: true,
                });
              };
              document.head.appendChild(s);
            `,
          }}
        />
        {/* <script
              async
              src="https://www.googletagmanager.com/gtag/js?id=G-J32RTE3P5K"
              strategy="afterInteractive"
            />
            <script strategy="afterInteractive">
              {`
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', 'G-J32RTE3P5K');
                `}
            </script>
            <script
              async
              strategy="afterInteractive"
              src="https://www.googletagmanager.com/gtag/js?id=G-J32RTE3P5K"
            />
            <script strategy="afterInteractive">
              {`
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
      
        gtag('config', 'G-J32RTE3P5K');
        `}
            </script> */}
        {/* <!-- Google tag (gtag.js) --> */}{" "}
        {/* <script
              async
              src="https://www.googletagmanager.com/gtag/js?id=G-V9VECY9C94"
              strategy="afterInteractive"
            />
            <script strategy="afterInteractive">
              {`
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());

      gtag('config', 'G-V9VECY9C94'); `}
            </script> */}
        {/* <!-- Google tag (gtag.js) --> */}{" "}
        {/* <script
              async
              src="https://www.googletagmanager.com/gtag/js?id=G-TKSJT5BB5E"
              strategy="afterInteractive"
            />
            <script strategy="afterInteractive">
              {` 
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());

                gtag('config', 'G-TKSJT5BB5E');  
                `}
            </script> */}
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-904C1779CP"
          strategy="afterInteractive"
        />
        <script strategy="afterInteractive">
          {" "}
          {`
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-904C1779CP');
 `}{" "}
        </script>
        {/* <script
              async
              src="https://www.googletagmanager.com/gtag/js?id=G-8RSP0DSH7L"
              strategy="afterInteractive"
            />
            <script strategy="afterInteractive">
              {` 
              window.dataLayer = window.dataLayer || []; 
              function gtag(){dataLayer.push(arguments);} 
              gtag('js', new Date()); 
              gtag('config', 'G-8RSP0DSH7L');
     `}
            </script> */}{" "}
      </Head>{" "}
      <body>
        <Main />
        <NextScript />
      </body>{" "}
    </Html>
  );
}
