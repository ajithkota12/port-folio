import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Moon, Sun, Download, Mail, Phone, Github, Linkedin, ArrowRight, ArrowDown } from 'lucide-react';
import emailjs from '@emailjs/browser';

const Index = () => {
  const [isDark, setIsDark] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const skills = [
    "Python", "Java", "HTML", "CSS", "JavaScript",
    "React.js", "Angular", "Node.js", "FastAPI",
    "PostgreSQL", "Material-UI", "Chart.js"
  ];

  const projects = [
    {
      title: "Real-Time Chat Application",
      description: "Interactive chat app with real-time messaging capabilities",
      tech: ["React.js", "Node.js", "PostgreSQL", "Socket.IO"],
      image: "https://plus.unsplash.com/premium_photo-1677252438450-b779a923b0f6?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      github: "https://github.com/ajithkota12/CHAT-APPLICATION"
    },
    {
      title: "food-ordering-app",
      description: "Food ordering app with user authentication and payment gateway integration",
      tech: ["React.js", "Node.js", "Mongo DB", "Express js"],
      image: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAKMArgMBIgACEQEDEQH/xAAcAAACAgMBAQAAAAAAAAAAAAAABgQHAgMFAQj/xABTEAABAgQEAgUEDAgJDQAAAAABAgMABAURBhIhMRNRB0FhcYEUIjKhMzU3QnV2kbGys8HRFRcjUnKSk7QWJFRVVmLC4fAlJ0RTY2ZzdIKUotPx/8QAGgEAAgMBAQAAAAAAAAAAAAAAAAMBAgQFBv/EAC0RAAICAQIEBQMEAwAAAAAAAAABAgMREjEEEyEyBUFRYXEUgcEiQuHwFbHR/9oADAMBAAIRAxEAPwC2IIIIQdAIIIIACCCCAAgiHWKlK0imTVQn3MktLt5ln5gO0kgDtPbCvTpDGuLGEVI1VGHZB0ZpeVal0vPLQditStiRrpz2iVHJSVijuOkELH8CMTbfw9nbf8k198VXjuu44wdiB2mv16YdasFy75aQA6g9drHY3HhFtDF89ehfcEfMX4yMYfz6/wDs0fdB+MjGH8+P/s0fdBoZPPR9OwR8xfjIxh/Pj/7NH3Rtlsf41m5hqWlqxMOPvLDbaA23dSibADTe5tBoYc9H0xBCpL4JxWuXbVM47m23ikFxCJJspSq2oB00vA9hLGkmONTsZiceTqJedkEBtzsKk3KfAQaGHPQ1wQvYQxE5XJeaYqEoZGrSLnBnZQqzZFdSk80m1x853hh77eEUawNTyshBBBASEEEEABBGZRpGFraQEJ5CCCCAkIIIIAE3pSQl2gyMs55zMxVZZt5H5yCrUH5BFlJAAsNorfpO9qqV8MSn0jFkw2Gxku7gjm1mh0uuNJZq9OYnEIN0h5AOU9h3HhHSgiwoVfxdYO/o7I/qQfi6wd/R2R/U/vhqggAVfxdYO/o7I/qf3xMpWD8OUebTNUyiyctMJ9F1DYzJ0toTtpppHeggA8G0ewQQAVy8OD00TaWhlD9BS44B79YdCQT220htHZClN+7W78XR9eIbYVPc109oQQQRUaEEEEAG+MSlJ3jVBE5K6T1QANhHkEEQWCCCCABP6TvaqlfDEp9IxZMVt0ne1VK+GJT6RiyYbDYyXdwQrY9afmZOnS0sMzj1QQjhmaclwsZFmxcbBUNr6coaYhVJ2SZDLs/w7Jd/Ilab2csduu9s23VeLChQlKfxapKUGtksSzclxmJNqeecRMul1ee7irLcyp4ZynQcTY2BEafmHKO5WqdTqhMN0llckHZhTxWZDiuqS8lK1XIAQEq1JyZ77bM1WXhyrsIl6omSn2OEJlIdQHEhFlWcvsNEq17DEuTYpFPaFKkmJWXbINpZptKUm4JPm2tcgE9toAF6fp8ph+epDtDeeRNTc22wpgzS3EzTRvxFFKlG5Sm68+/m22No5dJbRT6Rh2oSM9N/haefZQ7LuTjjqZlClAO/k1KIGVGZeZIFsnLSGSmy2FKO8/MUuTp8o4Gypx6Wlwkhvf0gNtL269420mWwxIzCn6RK0uXeXlQtcsyhClZlEAGwvqpKh3pVygA742j2PBtHsAFczfu1u/F0fXiG2FKb92t34uj68Q2wqe5rp7Agggio0III8J11NhAB7BBBAAQQQQAEEEEACf0ne1VK+GJT6RiyYrbpO9qqV8MSn0jFkw2Gxku7giBVZN6aMquXdbbclnuKC4gqB8xSbaEfneqJ8Yk6xYUKTmF1oTOKcnWMszKLZdcU0pOVxanlKWBnsE3eNkm5sLZuuJLkgiql7/KrKJxzh8N6TIzMqQVapuTulRB7CYVK/VnKpPvHPeWZWUNt9WmmbvNr3jkuutsILjrnDSnXOVWA7Ypr9DuV+DZr1WTw/wDRYcxh3iKm0MONtMPsBlAShQUyAjKAmxtbwBHPaN8jh9uUmJB9bgdck23khakkqWpagc5Nz51s1+1arWBIhdwFjuQrcy5R1zQXONC7SlqAL41JCRe5IA+TXnD8n0RFzizjpk45zj0BO0ewQQFSuZv3a3fi6PrxDbClN+7W78XR9eIbYVPc109gQQQRUaYrKQklZASBclWw74q+s4pr2Jam7J4QamFy0v5xXL2zudWYk6BPIbnU69TF0p1RVPwutpu+abXwDbfJYqV8oFvGGPAWHkYfw7LsLR/G3kh2ZUdys9XcNvCH1xSWpmS+bctCYsOYorlAcSnGFGS1KqNvLpJRW2OWYan5jyBhwln2ZphuYlnEOMuJzIWg3Cgeu8cfGU6WkynEzOSrwUl6XVql1OhKSOu4No5WEW10Ov1jC61rVLMWmpIr34atx22JAvzzQtuM84XVDlGdahKTypZx9hxgggig0IIIIAE/pO9qqV8MSn0jFkxW3Sd7VUr4YlPpGLJhsNjJd3BGKuUZRid9YsKKSzqk5hxl3dKylXeDYwyyNHkZ2ktuzEjKTL6sy2zMNBYG4G4NtLdR7jHVxHT6M/PKeXKBb1/yqw4pKSe4HeJ1GlkTTRDTyEoRYJSkagdvq1jDG6ErHXF9T0vF8bG6iMsNep06LT5CWlGlSslLsEC122Qn7I6Y0ECBlSByFo9jajzcnlthBBBEkFczfu1u/F0fXiG2FKb92t34uj68Q2wqe5rp7AjwkDU7RiVKzZUA36ydh98AQPSWc57dh3RUaV/0tlBYpDq/YETCgu+2oB+YGLVeKso4YBN+dtISekCkqq+F5pplN32LPtAC9yncDvSVDxEdDo5xG3iHDrBUtJnZZCWplJOtwNFdyhr33HVD11rMVvS35I0iFOVGQDzrjranNEvAG1kkg7aWiJLKRP8ASXV5tq5bkpJuTWQdCsnMR4WI8IWKzjiWZUhugcabmwqzbim7IQo+aMotdStdttt9ocMH0R2h0ZDTyuLNvK4804pWYqcVvr19Q7YotP6pxjpT8sYK0Rn0jOWWjv3vBGKVpOhSUq5HeMoWbwgjVM8byd3ycgO5DkJFxmtpeEQYhxCR7NJfsjAaKOGnfnR5HQ6TvaqlfDEp9IxZMUvWZqrVlhhmdclVIYmETCciSkhaDdPh2RqrfSTiKQmRLodkVLAzKIZJA5Df/FxDIPyE8XwFtMeZJrBdsQatM+SyTi0+mdE95itpPFuLHZZsvPSIcUASksEZSdgYda8pfBlW3cpcKSV5ds1rffCOLt5dEpLf/pRcFOucOZ+44L6rqtHTwyLVI/8ADMaG5Rt1sLIIJvqIn4fZDVScCSSA0d+9McTh+HnGyub2bRtvmuVJewyDaPY8Gwj2PSnDCCPLx7ABXU4bdNTp/wB3B+8CGixd30T2e+74Vp0ZumpzN1YdFv8AuBDb3wqe5rp7DElKE8kxil5tRslWsapwKCc4UrTTKOuIYKgbgkHmYqMOp67xTOMqZOYTrzszS5h6Tlpy6mlsKKMovdSL8r6jstFqcV3/AFqvAmMXpBmqNcOdbTMISoKCFgKsdddYZXPQxV1fMQi9HWGvJ1t1qotKLlv4q1b0b+/P2DlrytY7UyHFhIRvEI767xulPZ0eMROTk8smuCrWETlBKtFC/IHqjEZmzrdSdLW6u/sjOCKDTAqSpslJBTY2t3RXA2EWM4nRSkelY3HPT/5FcJ9EQHX8J/f9vyBdYYPEm18NgWzrUbADv6r7QvyNNVU6g5O1KneSuNlLweZczMTBJsEjcHYm6TbzSLRExlP5nESDXvbLct1nqHyfOI7dBkDT6YhlWi1niLHJRG3gInGFkravq+M0Lthv8/38nRRunviwMSH+NtfofbCAn0x+lDXjqtSFIqUompPKaTMNHhnISnzSL3sD+cIx8bGU6GorOxbxGSjbW37/AINsu8kICVG1tjEltWRfEQ7lWdMwMLiK/R3BdNWku3NMJB+QmNbXSFQqLNFCi7PcQWUZMJWEeJIB8CYycHbc5RqlHovPGxhunCMXLI7MVR1PmvISsDrSLGOfiHF0hTEIYTNNIqExowy8qxOtr8u7mdIj0zG2D6wciJ9lhw+9mgWCT2E2B8CYxxNgGkV6YZqBSry2XSOC5xDlUAbgKHWLk/LHaSkjnxlS5p48/sLjU5MTFSYmX31Le4gIWo+j90WLR5xU3Lni2LiDY2G/IxWciQurJlwpBfbmOEtGYXSsKsQfGLNpEl5FLkLtnWbqt1dkZcW/URx24eTq+LOpwjpx7YEqZ92p34uj94ENsKU17tTvxdH7wIbY0S3OZT2Eec9h8YgxOnPYfGIMVQw9iVJbL8IixKktl+ESwRFjdKezo8Y0xulPZ0eMDIJ8EEEQWI0/Iy1QZ4M62HGgoKykkajuhRxdgyWcojn4AkW250KSR+WUm4vrqTbbn90OqlhI85VhGh59pTKgDdR2EWjJx2KSgpIrXE1NoiaJTnpKSRLzn4TlpebQSQ4m/pJIv17g7EEEaRYU1hLCsowt6YkGkNJ9JRWuw9cKOOqShcg3U20oS5KPoc1KgXAjMvJpvqL67a87HgTvSLiGuIdkkykkppw3CG2lqUkA3Gubu1h8U5LKM8oqM4qS6P0O9hmm4dE1WTW2EcLy5fkWZSz+RuctrH54nYvpOHKzh5FPps4zKPSyy7LKUhakgn0kk72V6rA62tCN5ViPLm8hZCd9Mt/kzRBfxBVGFZJhlptR6i0QT64NM5bYNs6uDrWZ618r+DmzFBqTC1oVKqWEm2ZpQWD3W19URl0+eQknyKZCU7ksqAHqjspxJUnHEoQhlSlEJSkNkknqFrxeeD6I7SKakzq0rnXkpU/k9FJ181PO17X64hxlHczW/SOL5Unn3SPmkELBtbLsdbjuizehnEbzNXNCmn3FS8wgqlmybhDiQVEDkCkKPLzecYdOSk/wgkG0pSFeSlZIGpuoj+zC30Yn/OLQrfnvdf8AsHIgzHU6SWxQ+kpM+gD0peeCQLbEA27y2YvttSVoStBulQuDzinenmWCajSJnLfiMutqPLKUkX/XPrhz6L62ms4TlULVeakkiVeF9fNFkq8Uga87iADlTfu1u/F0fXiG2FKa92p34uj94ENsKnua6ew0TnsPjEGJs57D4xBiqGHsS5H3/h9sRIlSWy/CJYEWN0p7OjxjTG6U9nR4wMgnwQRpff4Skpy3zdsQWMJ72IfpD7YhxuemOKgJyWsd406302NwYkgWcdpm36fLSsqtSEOvEOKA9FNrk95tbxhbU2mlMtMyKUJTY3KkJUVHncrT9sZ4vxXMN1d6RZYYKJZWQKVclWgvpcRwXMTTTn+jyp7wYaqptGmjjeFrhiUnq+NjseXTY981+yR/7oyXLirybrc4UXT6C0oSCg8xZavnHrjhnEcz/JJQ/wDQfvjxzE04GylpmVbJFrhJ08L7wOma6jv8lwsuk5Np/JN6M5ATOPae1MgAS63HVJO2ZCTa3cqx8I+iRHy9hutu0LEEpVUpLqmXLuIBsVpUCFD5CbX67co+iqBiKk1+WS7TZxp02uprNZaOxSdxEnCePIp/puVnxm0Pzae2P/NwxxOjDzukiifpu/UOR3+lSl1Gp4+4UrJTKg60y0h0MqKLnrvtbXXlaNuFMJVCj9LDJTIzIpss++W5hSSU5C0sJ16/SAgIwMPTszmw/TX/AMydyeCm1H+zFWYartQw/VETlMeyFZSlxtQzJcTfZQ+3cX0i3OmyYlm8KNsOrHlDsyksoG5yg5j4A+sRX2EqaGGPL3UnO6Pyf9VPMdp+YRDeEaeE4aXE2aEOs7M36VlTyFgyxofB4wIyBfGvlzbZra23hnE04pIKVgoOxTa0Img3taN0pPKk3AtlYtcAoJ0MJzk7b8KUI/ol1H2c9h1N9YgxLdcD0kh0JKc4CrEai4iJAjlNYZ7EqS2X4RFiVJbL8IlgRY3Sns6PGNMZsKCHUqVtAwOkOsxzphWZ1RiV5U2R5u5EQSbkntiEAQbddyeqCCJIK06T6MxT5dyuMLWXn30NraVbLcg6j5NoSaEfwpWJaRcAaQ9muodVkqO3h64tLpOl0zdEkJZxRDb1Ul215dSASReKnr1IqOE6+uRmQtuYlnAtl0aBaferT2Hx5dUPhZLBjthHVsPBwax/LnP1RCdW8tMrT0glXEQ0UgrO9ikHX5Y6B6QKkZbIJWW4404uvy5f8CORQKNUsWV1EjK51zEwrO+8oZg0nrWrkOXPQcotzJeorREkpkX1DMiXmCk6ghBIMe/g9+4Pkz+Yc2jp6o+o6dKM0+ny0lKpysS7SWm08kpFh6hEiJ1r0DS/U+babVa1TmktMSzjmUk5nG1k69sbmK7WWAQ3IAXvezLh37Lx9GQRGY+hojxF8VhT9vsfLc23NOvGYfYcCUm9lJVkTzGuwJ7Y7lNxAmq1iSpzIS2lSSp8p6yEk5E9gtqewxfVYp7NWpk3Tpm/BmmVNLtuAoWuO3WPlWq02pYWri5SazszcqsKQ4NlgeitPMEfaD1xEmn5BVfbUpKMu4t9aW3G1IdSFIVcKQdteq3KKbxHIy0hXZ2UZSA0hzzQNgCL28L2hgX0gVFUtkEpLB46F4XsO5N9/lji0OjzmJayiVZKlKdVnmH9+Gkm6ln12HWdIqKxk+gqBMuzmEqRNTCszz0mytauZKASY3RJUiXl5JqWlyEtshLaEjYJAsB8giP43hJuWwRJk1JAWCpI23MRoICQggggICCCCAAggggAVukL2vpPwxK/Sh+xJQKVX5NTFXkWplCAVIKrhSD/AFVCxHgYIIZHYzW9x86oo8gcYqppZPkgcyhviKvble9/XH0Thqh0ug09pikyTUshzzl5dVLPMqOp8TBBFhR2oIIIACCCCAAjiYow9SK/J8KryLUyGwVIUq6VoO/mqFiPAwQQAfNzNMlFYsNPU0TK57ZM6r27739cXfRqTIUeWRLUyVbl2lAKUE7qNtyTqfGCCKSHUk4G4uY9ggihoCCCCAD/2Q==",
      github: "https://github.com/ajithkota12/ajithkota12-food-ordering-app-MERN"
    },
    {
      title: "youtube video downloader",
      description: "A simple youtube video downloader with a user-friendly interface",
      tech: ["Fast API","HTML","Python"],
      image: "https://scontent.fhyd14-1.fna.fbcdn.net/v/t39.30808-6/302061326_197030506005672_8267459322028534934_n.png?_nc_cat=103&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=bqMjjFziHVUQ7kNvwHWQT26&_nc_oc=AdnDzQZ4fRgVE_-9eIJTC_U-YqbBqs90PYXnfHZ8iEJ1N3ng0SSGx41QrDSbHAwBGG8pSSUDT35HKuz96wW-HIfl&_nc_zt=23&_nc_ht=scontent.fhyd14-1.fna&_nc_gid=GHm4zvDDU2s9CmQibuHTVA&oh=00_AfQ1GD9nC80Ui-og4AEW7syNXHzx5lm2k4FuLEqtJZNTOg&oe=687C4A9F",
      github: "https://github.com/ajithkota12/yt-video-downloader"
    },
    {
      title: "Doctor Appointment App",
      description: "Doctor appointment app with user authentication and payment gateway integration",
      tech: ["Angular", "Node.js", "Mongo DB", "Express js"],
      image: "https://as1.ftcdn.net/jpg/15/14/09/02/1000_F_1514090270_TnnzXv3bePnSfYS7BNj0Lnz2BHNEngHG.webp",
      github: "https://github.com/ajithkota12/doctor-appointment-booking-MEAN"
    },
    {
      title: "Real-time face emotion detection",
      description: "Real-time face emotion detection using OpenCV and Python",
      tech: ["Python", "OpenCV", "TensorFlow"],
      image: "data:image/jpeg;base64,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",
      github: "https://github.com/ajithkota12/real-time-face-detection"
    },
    {
      title: "Chrome Productivity Extension",
      description: "Browser extension for enhanced productivity tracking",
      tech: ["Node.js", "PostgreSQL", "Chart.js"],
      image: "https://images.unsplash.com/photo-1668853907308-2c2feb8687ec?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      github: "https://github.com/ajithkota12/CHROME-EXTENSION-FOR-TIME-TRACKING-AND-PRODUCTIVITY-ANALYTICS"
    },
    {
      title: "Collaborative Document Editor",
      description: "Real-time collaborative editing tool for teams",
      tech: ["React.js", "Node.js", "Socket.IO"],
      image: "https://plus.unsplash.com/premium_photo-1677340725081-e81626d96e29?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      github: "https://github.com/ajithkota12/REAL-TIME-COLLABORATIVE-DOCUMENT-EDITOR"
    },
    {
      title: "Weather Web App",
      description: "Dynamic weather application with API integration",
      tech: ["Angular", "API Integration"],
      image: "https://plus.unsplash.com/premium_photo-1675968513923-e07c6bbe0218?q=80&w=2032&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      github: "https://github.com/ajithkota12/-API-INTEGRATION"
    }
  ];

  const services = [
    {
      title: "Full-Stack Web App Development",
      description: "End-to-end web application development with modern technologies",
      icon: "💻"
    },
    {
      title: "UI/UX Design Implementation",
      description: "Converting designs into responsive, interactive interfaces",
      icon: "🎨"
    },
    {
      title: "Real-Time App Development",
      description: "Building real-time applications with WebSocket technology",
      icon: "⚡"
    },
    {
      title: "Chrome Extension Creation",
      description: "Custom browser extensions for enhanced productivity",
      icon: "🔧"
    },
    {
      title: "Task Automation",
      description: "Python-based automation solutions for repetitive tasks",
      icon: "🤖"
    },
    {
      title: "API Integration & Development",
      description: "Seamless API integration and custom API development",
      icon: "🔗"
    }
  ];

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle('dark');
  };

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Initialize EmailJS with your public key
      emailjs.init('c1S87regYXZLE4Gy9');

      // Send email using EmailJS
      const result = await emailjs.send(
        'service_lf3gm8h', // Your service ID
        'template_ng3bm6c', // Your template ID
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
          to_name: 'Kota Ajith Kumar',
        }
      );

      console.log('Email sent successfully:', result);
      
      toast({
        title: "Message Sent!",
        description: "Thank you for your message. I'll get back to you soon!",
      });
      
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      console.error('Failed to send email:', error);
      toast({
        title: "Error",
        description: "Failed to send message. Please try again or contact me directly.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDark ? 'dark bg-slate-900' : 'bg-white'}`}>
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-background/80 border-b border-border">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
            Kota Ajith Kumar
          </h1>
          <div className="flex items-center gap-6">
        <nav className="hidden md:flex items-center gap-6">
          <button onClick={() => scrollToSection('home')} className="text-blue-200 hover:text-white transition-colors">Home</button>
          <button onClick={() => scrollToSection('about')} className="text-blue-200 hover:text-white transition-colors">About</button>
          <button onClick={() => scrollToSection('experience')} className="text-blue-200 hover:text-white transition-colors">Experience</button>
          <button onClick={() => scrollToSection('projects')} className="text-blue-200 hover:text-white transition-colors">Projects</button>
          <button onClick={() => scrollToSection('services')} className="text-blue-200 hover:text-white transition-colors">Services</button>
          <button onClick={() => scrollToSection('contact')} className="text-blue-200 hover:text-white transition-colors">Contact</button>
        </nav>
        <Button variant="ghost" size="icon" onClick={toggleTheme} className="text-blue-200 hover:text-white">
          {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </Button>
      </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center pt-20 px-6">
        <div className="container mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <p className="text-primary font-semibold">Hello, I'm</p>
              <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
                <span className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
                  Kota Ajith Kumar
                </span>
              </h1>
              <p className="text-xl text-muted-foreground">
                Full-Stack Developer | Real-Time Systems | Automation Enthusiast
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Passionate Computer Science student crafting impactful software solutions 
                with expertise in full-stack development, real-time applications, and automation.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button onClick={() => scrollToSection('projects')} className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
                View Projects <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button variant="outline" className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700" onClick={() => scrollToSection('contact')}>
                Contact Me
              </Button>
            </div>
          </div>
          <div className="flex justify-center lg:justify-end">
            <div className="relative">
              <div className="w-80 h-80 rounded-full overflow-hidden border-4 border-gradient-to-r from-blue-500 to-purple-600 shadow-2xl">
                <img 
                  src="/lovable-uploads/987a6c8c-efd1-4812-94f6-c8b2733181ca.png"
                  alt="Kota Ajith Kumar"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/20 to-purple-600/20 rounded-full blur-xl -z-10"></div>
            </div>
          </div>
        </div>
        
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-6">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16 text-cyan-400">About Me</h2>
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <Card className="backdrop-blur-sm bg-card/50 border-border/50">
              <CardContent className="p-8">
                <h3 className="text-2xl font-semibold mb-6 ">Personal Bio</h3>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  I'm a passionate and driven Computer Science student with a deep enthusiasm for technology and innovation. 
                  My journey in the world of programming began with curiosity, and it has evolved into a dedicated pursuit 
                  of creating impactful software solutions.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  I specialize in full-stack web development, real-time applications, browser extensions, and automation. 
                  My project-driven mindset and strong technical capabilities enable me to deliver robust, user-centered solutions.
                </p>
              </CardContent>
            </Card>
            <Card className="backdrop-blur-sm bg-card/50 border-border/50">
              <CardContent className="p-8">
                <h3 className="text-2xl font-semibold mb-6">Education</h3>
                <div className="space-y-4">
                  <div className="border-l-4 border-gradient-to-b from-blue-500 to-purple-600 pl-6">
                    <h4 className="text-xl font-semibold">B.Tech in Computer Science and Engineering</h4>
                    <p className="text-primary font-medium">Seshadri Rao Gudlavalleru Engineering College</p>
                    <p className="text-muted-foreground">Expected 2026</p>
                    <p className="text-sm text-muted-foreground mt-2">
                      Focusing on software engineering, data structures, algorithms, and modern development practices.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Experience Section */}
          <section id="experience" className="py-20 px-6 bg-muted/30">
            <div className="container mx-auto">
              <h2 className="text-4xl font-bold text-center mb-16 text-cyan-400">Experience</h2>

              {/* CodTech Internship */}
              <Card className="backdrop-blur-sm bg-card/50 border-border/50 max-w-4xl mx-auto mb-8">
                <CardContent className="p-8">
                  <div className="flex items-start gap-6">
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold text-xl">
                      C
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-semibold mb-2">Full-Stack Web Development Intern</h3>
                      <p className="text-primary font-medium mb-2">
                        CodTech IT Solutions | March 2025 – April 2025
                      </p>
                      <ul className="space-y-2 text-muted-foreground">
                        <li className="flex items-start gap-2">
                          <span className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                          Developed a dynamic weather web app using Angular and public APIs
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                          Built a real-time collaborative document editor using full-stack technologies
                        </li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* SmartBridge Internship */}
              <Card className="backdrop-blur-sm bg-card/50 border-border/50 max-w-4xl mx-auto">
                <CardContent className="p-8">
                  <div className="flex items-start gap-6">
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold text-xl">
                      S
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-semibold mb-2">Full-Stack Web Development (MERN) Intern</h3>
                      <p className="text-primary font-medium mb-2">
                        SmartBridge Educational Services Pvt. Ltd. | May 2025 – July 2025
                      </p>
                      <ul className="space-y-2 text-muted-foreground">
                        <li className="flex items-start gap-2">
                          <span className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                          Built a real-time food ordering app using full-stack technologies
                        </li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>


      {/* Projects Section */}
      <section id="projects" className="py-20 px-6">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16 text-cyan-400">Featured Projects</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <Card key={index} className="group backdrop-blur-sm bg-card/50 border-border/50 hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                <div className="aspect-video overflow-hidden rounded-t-lg">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-3">{project.title}</h3>
                  <p className="text-muted-foreground mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.map((tech, techIndex) => (
                      <Badge key={techIndex} variant="secondary" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                  <Button 
                    variant="outline" 
                    className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                    onClick={() => window.open(project.github, '_blank')}
                  >
                    View Project <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 px-6 bg-muted/30">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16 text-cyan-400">Services</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="group backdrop-blur-sm bg-card/50 border-border/50 hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                <CardContent className="p-6 text-center">
                  <div className="text-4xl mb-4">{service.icon}</div>
                  <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
                  <p className="text-muted-foreground">{service.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16 text-cyan-400">Skills & Technologies</h2>
          <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
            {skills.map((skill, index) => (
              <Badge key={index} variant="outline" className="text-sm py-2 px-4 hover:bg-primary hover:text-primary-foreground transition-colors cursor-default">
                {skill}
              </Badge>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-6 bg-muted/30">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-4xl font-bold text-center mb-16 text-cyan-400">Get In Touch</h2>
          <div className="grid lg:grid-cols-2 gap-12">
            <Card className="backdrop-blur-sm bg-card/50 border-border/50">
              <CardContent className="p-8">
                <h3 className="text-2xl font-semibold mb-6">Contact Information</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <Mail className="h-5 w-5 text-primary" />
                    <span>ajithkumarkota12@gmail.com</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <Phone className="h-5 w-5 text-primary" />
                    <span>7382948404</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <Linkedin className="h-5 w-5 text-primary" />
                    <a href="https://linkedin.com/in/ajith-kumar-212203290" className="hover:text-primary transition-colors">
                      linkedin.com/in/ajith-kumar-212203290
                    </a>
                  </div>
                  <div className="flex items-center gap-4">
                    <Github className="h-5 w-5 text-primary" />
                    <a href="https://github.com/ajithkota12" className="hover:text-primary transition-colors">
                      github.com/ajithkota12
                    </a>
                  </div>
                </div>
                <Separator className="my-6" />
               <a href="/resume.pdf" download className="w-full">
                <Button className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
                  <Download className="mr-2 h-4 w-4" />
                  Download Resume
                </Button>
              </a>

              </CardContent>
            </Card>
            <Card className="backdrop-blur-sm bg-card/50 border-border/50">
              <CardContent className="p-8">
                <h3 className="text-2xl font-semibold mb-6">Send a Message</h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="name">Name</Label>
                    <Input 
                      id="name" 
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Your name" 
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input 
                      id="email" 
                      name="email"
                      type="email" 
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="your.email@example.com" 
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="message">Message</Label>
                    <Textarea 
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Your message"
                      className="min-h-[120px]"
                      required
                    />
                  </div>
                  <Button 
                    type="submit" 
                    className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-border">
        <div className="container mx-auto text-center">
          <p className="text-muted-foreground">
            © 2025 Kota Ajith Kumar. Crafted with passion and modern technologies.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
