"use client"

import { useRef, useEffect } from "react"
import Image from "next/image"

interface GalleryItem {
  before: string
  after: string
  label: string
}

export default function ThreeDBeforeAfterGallery() {
  const galleryItem: GalleryItem = {
    before: "/homepage/before0001.png",
    after: "/homepage/example0001.png",
    label: "Kitty",
  }

  const containerRef = useRef<HTMLDivElement>(null)

  // 3D effect on mouse move
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return

      const { left, top, width, height } = containerRef.current.getBoundingClientRect()
      const x = (e.clientX - left) / width - 0.5
      const y = (e.clientY - top) / height - 0.5

      containerRef.current.style.transform = `
        perspective(1000px) 
        rotateY(${x * 5}deg) 
        rotateX(${-y * 5}deg)
      `
    }

    const handleMouseLeave = () => {
      if (!containerRef.current) return
      containerRef.current.style.transform = `
        perspective(1000px) 
        rotateY(0deg) 
        rotateX(0deg)
      `
    }

    const container = containerRef.current
    if (container) {
      container.addEventListener("mousemove", handleMouseMove)
      container.addEventListener("mouseleave", handleMouseLeave)
    }

    return () => {
      if (container) {
        container.removeEventListener("mousemove", handleMouseMove)
        container.removeEventListener("mouseleave", handleMouseLeave)
      }
    }
  }, [])

  return (
    <div className="relative mx-auto max-w-4xl py-10">
      <div
        ref={containerRef}
        className="relative h-[550px] w-full transition-transform duration-300 ease-out"
        style={{ transformStyle: "preserve-3d" }}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative w-full max-w-3xl">
            {/* Main card container */}
            <div className="relative flex h-[500px] md:h-[550px] rounded-xl bg-background/90 backdrop-blur-sm shadow-xl overflow-hidden">
              <div className="flex w-full" style={{ transformStyle: "preserve-3d" }}>
                {/* Before image */}
                <div className="w-1/2 relative">
                  <div className="absolute top-2 left-2 z-10 bg-background/80 backdrop-blur-sm text-xs px-2 py-1 rounded-full">
                    Before
                  </div>
                  <div className="h-full w-full overflow-hidden">
                    <Image
                      src={galleryItem.before || "/placeholder.svg"}
                      alt={`Before ${galleryItem.label}`}
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* Overlay with arrow */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-primary/20 backdrop-blur-sm rounded-full p-3">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-primary-foreground"
                      >
                        <path d="M5 12h14"></path>
                        <path d="m12 5 7 7-7 7"></path>
                      </svg>
                    </div>
                  </div>
                </div>

                {/* After image */}
                <div className="w-1/2 relative overflow-hidden">
                  <div className="absolute top-2 right-2 z-10 bg-primary/80 text-primary-foreground backdrop-blur-sm text-xs px-2 py-1 rounded-full">
                    After
                  </div>
                  <div className="h-full w-full">
                    <Image
                      src={galleryItem.after || "/placeholder.svg"}
                      alt={`After ${galleryItem.label}`}
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* AI Generated badge */}
                  <div className="absolute bottom-2 right-2 rounded-full bg-primary px-3 py-1 text-xs text-white">
                    <span className="flex items-center gap-1">
                      <span className="h-2 w-2 rounded-full bg-white"></span>
                      AI Generated
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Transformation label */}
            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-lg">
              {galleryItem.label}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

