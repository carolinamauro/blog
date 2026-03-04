import type { MDXComponents } from "mdx/types"
import Image from "next/image"

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    img: (props) => (
      <Image
        alt={props.alt}
        sizes="100vw"
        style={{ width: "100%", height: "auto" }}
        width={800}
        height={400}
        {...props}
      />
    ),
    ...components,
  }
}