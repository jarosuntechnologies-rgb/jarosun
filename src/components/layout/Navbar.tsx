"use client";

import React from "react";
import StaggeredMenu from "@/components/ui/StaggeredMenu";

const menuItems = [
  { label: "Services", ariaLabel: "View our services", link: "/#services" },
  { label: "Projects", ariaLabel: "View our projects", link: "/#projects" },
  { label: "Tech", ariaLabel: "View our tech stack", link: "/#tech" },
  { label: "Contact", ariaLabel: "Get in touch", link: "/#contact" },
];

const socialItems = [
  { label: "LinkedIn", link: "https://www.linkedin.com/company/jarosun/?viewAsMember=true" },
  { label: "Instagram", link: "https://www.instagram.com/jarosuntechnologies?igsh=MXhhZHBlaHZtcDljdQ==" },
];

export default function Navbar() {
  return (
    <StaggeredMenu
      isFixed={true}
      position="right"
      colors={["#1a0000", "#c00000"]}
      accentColor="#c00000"
      menuButtonColor="#ffffff"
      openMenuButtonColor="#ffffff"
      changeMenuColorOnOpen={false}
      logoUrl="/Jarosun Text Logo.png"
      items={menuItems}
      socialItems={socialItems}
      displaySocials={true}
      displayItemNumbering={false}
      closeOnClickAway={true}
    />
  );
}
