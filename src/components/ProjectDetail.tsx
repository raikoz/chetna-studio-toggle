import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import ReactMarkdown from "react-markdown";

interface ProjectDetailProps {
  project: any;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ProjectDetail({ project, isOpen, onOpenChange }: ProjectDetailProps) {
  if (!project) return null;

  const images = project.brandMedia?.filter((m: any) => 
    m.fields.file.contentType.startsWith("image/")
  ) || [];

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-3xl font-medium tracking-tight mb-4">
            {project.brandName}
          </DialogTitle>
        </DialogHeader>
        
        <div className="grid grid-cols-1 gap-8">
          {images.length > 0 && (
            <div className="relative w-full px-12">
              <Carousel className="w-full">
                <CarouselContent>
                  {images.map((img: any, idx: number) => (
                    <CarouselItem key={idx}>
                      <div className="aspect-video relative overflow-hidden rounded-lg bg-foreground/5">
                        <img
                          src={img.fields.file.url.startsWith("//") ? `https:${img.fields.file.url}` : img.fields.file.url}
                          alt={img.fields.title}
                          className="w-full h-full object-contain"
                        />
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                {images.length > 1 && (
                  <>
                    <CarouselPrevious className="-left-4" />
                    <CarouselNext className="-right-4" />
                  </>
                )}
              </Carousel>
              <p className="text-center text-xs opacity-40 mt-4 uppercase tracking-[0.2em]">
                Project Gallery / Brandbook Preview
              </p>
            </div>
          )}

          <div className="prose prose-invert max-w-none text-foreground/80 leading-relaxed font-serif">
            <ReactMarkdown
              components={{
                img: ({ node, ...props }) => (
                  <img
                    {...props}
                    className="w-full h-auto rounded-lg my-8 shadow-xl"
                  />
                ),
              }}
            >
              {project.brandDescription}
            </ReactMarkdown>
          </div>
          
          {project.brandMedia?.filter((m: any) => m.fields.file.contentType === "application/pdf").map((pdf: any, idx: number) => (
            <div key={idx} className="mt-4 p-4 border border-foreground/10 rounded flex items-center justify-between">
              <span className="text-sm font-medium">{pdf.fields.title}</span>
              <a 
                href={pdf.fields.file.url.startsWith("//") ? `https:${pdf.fields.file.url}` : pdf.fields.file.url} 
                target="_blank" 
                rel="noreferrer"
                className="text-xs uppercase tracking-widest border border-foreground/20 px-4 py-2 hover:bg-foreground hover:text-background transition-colors"
              >
                View PDF →
              </a>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
