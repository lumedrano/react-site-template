import React from 'react';
import CardNav from './CardNav';
import logo from '../../assets/web_design/navbar_logo.png';

export function Navbar() {
    const navItems = [
        {
            label: "About",
            bgColor: "#001F5B", // Navy
            textColor: "#FFFFFF",
            links: [
                { label: "About Us", href: "/about-us", ariaLabel: "About Us page" },       // dummy — add route in App.js when ready
                { label: "Leadership", href: "/leadership", ariaLabel: "Leadership page" }   // dummy — add route in App.js when ready
            ]
        },
        {
            label: "Engage",
            bgColor: "#0070C0", // Blue
            textColor: "#FFFFFF",
            links: [
                { label: "Sponsorship", href: "/sponsorship", ariaLabel: "Sponsorship page" }, // dummy
                { label: "SHPEtinas", href: "/shpetinas", ariaLabel: "SHPEtinas page" },       // dummy
                { label: "Membership", href: "/membership", ariaLabel: "Membership page" }     // dummy
            ]
        },
        {
            label: "Resources",
            bgColor: "#FD652F", // Orange
            textColor: "#FFFFFF",
            links: [
                { label: "Resources", href: "/resources", ariaLabel: "Resources page" }        // dummy
            ]
        }
    ];

    return (
        <CardNav
            logo={logo}
            logoAlt="UTSHPE Logo"
            logoHref='/'
            items={navItems}
            baseColor="#FFFF"
            menuColor="#001F5B"
            buttonBgColor="#001F5B"
            buttonTextColor="#FFFFFF"
            ease="power3.out"
        />
    );
}

export default Navbar;