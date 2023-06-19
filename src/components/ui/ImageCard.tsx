import Image from "next/image"
import { AspectRatio } from "../shadecnui/aspect-ratio"



export function ImageCard() {
  return (
    <AspectRatio ratio={16 / 9} className="bg-muted">
      <Image
        src="https://s3.resume.io/cdn-cgi/image/width=770,height=350,dpr=1.5,fit=crop,gravity=top,quality=75,format=auto/uploads/local_template_image/image/488/persistent-resource/dublin-resume-templates.jpg"
        alt="Photo by Drew Beamer"
        fill
        className="rounded-md object-fill"
      />
    </AspectRatio>
  )
}
