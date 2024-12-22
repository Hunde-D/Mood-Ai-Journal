const Footer = () => {
  return (
    <footer className="relative z-10 mt-20 bg-white/10 backdrop-blur-sm">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                width="40"
                height="40"
                viewBox="0,0,256,256"
              >
                <g
                  fillOpacity="0.83922"
                  fill="#f46507"
                  fillRule="nonzero"
                  stroke="none"
                  strokeWidth="1"
                  strokeLinecap="butt"
                  strokeLinejoin="miter"
                  strokeMiterlimit="10"
                  strokeDasharray=""
                  strokeDashoffset="0"
                  fontFamily="none"
                  fontWeight="none"
                  fontSize="none"
                  textAnchor="none"
                >
                  <g transform="scale(5.12,5.12)">
                    <path d="M3.998,36.001v-21.999c0,-5.519 4.48,-10 10,-10h22c5.52,0 10.001,4.481 10.001,10v21.999c0,5.52 -4.481,10 -10.001,10h-22c-5.52,0 -10,-4.48 -10,-10zM23.983,39.799c1.491,-1.124 3.067,-2.135 4.789,-2.975c0.195,-0.095 0.352,-0.251 0.452,-0.443l3.851,-7.495c-0.281,1.104 0.225,2.296 1.281,2.839c1.228,0.628 2.736,0.145 3.368,-1.083c0.628,-1.228 0.148,-2.736 -1.083,-3.368c-0.056,-0.028 -0.112,-0.053 -0.169,-0.077c0.477,-0.543 0.979,-1.011 1.479,-1.453c0.503,-0.445 1.055,-0.909 1.521,-1.368c0.476,-0.469 0.931,-0.997 1.257,-1.633c0.561,-1.089 0.304,-2.068 -0.355,-2.789c-0.548,-0.6 -1.4,-1.045 -2.009,-1.359l0.471,-0.916c0.751,-1.457 0.175,-3.252 -1.284,-4l-1.832,-0.943c-1.459,-0.748 -3.249,-0.171 -3.999,1.284l-9.613,18.705c-0.099,0.192 -0.132,0.411 -0.096,0.623c0.319,1.891 0.415,3.761 0.369,5.628c-0.02,0.835 0.937,1.326 1.602,0.823zM16.011,37.366l9.8,-19.069c0.071,-0.137 0.108,-0.291 0.109,-0.445l0.077,-6.839c0.009,-0.823 -0.927,-1.304 -1.591,-0.819l-5.519,4.043c-0.125,0.092 -0.227,0.212 -0.299,0.351l-9.799,19.069c-0.759,1.476 -0.175,3.295 1.303,4.052l1.868,0.96c1.477,0.758 3.291,0.173 4.051,-1.303zM24.369,37.078l-0.039,-1.029c-0.032,-0.5 -0.075,-1.003 -0.132,-1.508l-0.165,-1.181l2.596,-5.053l3.557,1.828l-2.597,5.053l-1.056,0.552c-0.445,0.248 -0.879,0.505 -1.304,0.772zM12.873,36.889l-1.868,-0.96c-0.493,-0.253 -0.691,-0.864 -0.436,-1.359l0.487,-0.948c0.007,0.004 0.013,0.007 0.02,0.009l3.627,1.864c0.005,0.004 0.011,0.007 0.017,0.009l-0.488,0.948c-0.254,0.495 -0.866,0.691 -1.359,0.437zM15.615,33.715l-3.627,-1.864c-0.007,-0.003 -0.012,-0.005 -0.017,-0.008l7.205,-14.021c0.451,0.544 0.995,0.996 1.637,1.325c0.64,0.329 1.321,0.508 2.025,0.557l-7.207,14.021c-0.004,-0.003 -0.01,-0.006 -0.016,-0.01zM35.27,29.946c-0.244,-0.125 -0.341,-0.429 -0.216,-0.673c0.128,-0.247 0.431,-0.343 0.675,-0.217c0.244,0.125 0.343,0.428 0.216,0.675c-0.126,0.243 -0.428,0.342 -0.675,0.215zM31.101,28.355l-3.557,-1.828l4.571,-8.896l3.56,1.829zM33.902,27.279l3.549,-6.905c0.74,0.379 1.2,0.657 1.447,0.927c0.112,0.124 0.133,0.196 0.137,0.227c0.004,0.023 0.015,0.111 -0.083,0.303c-0.191,0.368 -0.48,0.724 -0.884,1.121c-0.416,0.409 -0.881,0.799 -1.444,1.297c-0.875,0.776 -1.862,1.713 -2.722,3.03zM36.589,17.682l-3.56,-1.829l0.471,-0.916c0.245,-0.476 0.833,-0.664 1.308,-0.42l1.832,0.943c0.475,0.244 0.664,0.831 0.42,1.307zM21.727,17.367c-0.611,-0.312 -1.123,-0.835 -1.505,-1.58l0.04,-0.076l3.715,-2.721l-0.052,4.603l-0.039,0.077c-0.828,0.121 -1.549,0.011 -2.159,-0.303z"></path>
                  </g>
                </g>
              </svg>
              <span className="text-2xl font-bold text-primary">
                Mood AI Journal
              </span>
            </div>
            <p className="text-muted-foreground">
              Transforming your journaling experience with AI-powered insights.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-8 lg:col-span-2 lg:grid-cols-3">
            <div>
              <h3 className="mb-4 text-lg font-semibold">Product</h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="text-muted-foreground hover:text-primary"
                  >
                    Features
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-muted-foreground hover:text-primary"
                  >
                    Pricing
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-muted-foreground hover:text-primary"
                  >
                    AI Technology
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-muted-foreground hover:text-primary"
                  >
                    Updates
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="mb-4 text-lg font-semibold">Company</h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="text-muted-foreground hover:text-primary"
                  >
                    About Us
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-muted-foreground hover:text-primary"
                  >
                    Careers
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-muted-foreground hover:text-primary"
                  >
                    Press
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-muted-foreground hover:text-primary"
                  >
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="mb-4 text-lg font-semibold">Legal</h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="text-muted-foreground hover:text-primary"
                  >
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-muted-foreground hover:text-primary"
                  >
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-muted-foreground hover:text-primary"
                  >
                    Cookie Policy
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-muted-foreground hover:text-primary"
                  >
                    GDPR
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="mt-12 border-t border-border pt-8">
          <p className="text-center text-muted-foreground">
            © {new Date().getFullYear()} Mood AI Journal. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
