import { BentoCard, BentoGrid } from "@/components/ui/bento-grid"

const photoItems = [
  {
    name: "Mobile UI",
    description: "latest app screens",
    href: "#",
    cta: "View",
    className: "col-span-2 row-span-2",
    Icon: () => null,
    background: (
      <img
        src="https://via.placeholder.com/300x500" // replace with your mobile UI screenshot
        alt="Mobile UI"
        className="absolute inset-0 w-full h-full object-cover rounded-xl"
      />
    ),
  },
  {
    name: "Photography",
    description: "capturing moments",
    href: "#",
    cta: "View",
    className: "col-span-1",
    Icon: () => null,
    background: (
      <img
        src="https://via.placeholder.com/400"
        alt="Photography"
        className="absolute inset-0 w-full h-full object-cover rounded-xl"
      />
    ),
  },
  {
    name: "Design",
    description: "UI explorations",
    href: "#",
    cta: "View",
    className: "col-span-1",
    Icon: () => null,
    background: (
      <img
        src="https://via.placeholder.com/400"
        alt="Design"
        className="absolute inset-0 w-full h-full object-cover rounded-xl"
      />
    ),
  },
  {
    name: "Travel",
    description: "exploring the world",
    href: "#",
    cta: "View",
    className: "col-span-1",
    Icon: () => null,
    background: (
      <img
        src="https://via.placeholder.com/400"
        alt="Travel"
        className="absolute inset-0 w-full h-full object-cover rounded-xl"
      />
    ),
  },
  {
    name: "Workspace",
    description: "my setup",
    href: "#",
    cta: "View",
    className: "col-span-1",
    Icon: () => null,
    background: (
      <img
        src="https://via.placeholder.com/400"
        alt="Workspace"
        className="absolute inset-0 w-full h-full object-cover rounded-xl"
      />
    ),
  },
  {
    name: "Projects",
    description: "what I build",
    href: "#",
    cta: "View",
    className: "col-span-2 row-span-1",
    Icon: () => null,
    background: (
      <img
        src="https://via.placeholder.com/400"
        alt="Projects"
        className="absolute inset-0 w-full h-full object-cover rounded-xl"
      />
    ),
  },
  {
    name: "Code Snippets",
    description: "random hacks",
    href: "#",
    cta: "View",
    className: "col-span-1",
    Icon: () => null,
    background: (
      <img
        src="https://via.placeholder.com/400"
        alt="Code Snippets"
        className="absolute inset-0 w-full h-full object-cover rounded-xl"
      />
    ),
  },
]

export default function BentoPhotos() {
  return (
    <div className="mt-12">
      <BentoGrid>
        {photoItems.map((item) => (
          <BentoCard key={item.name} {...item} />
        ))}
      </BentoGrid>
    </div>
  )
}