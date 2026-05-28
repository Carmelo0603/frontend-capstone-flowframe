import { NavbarBlock, NavbarInspector } from "./NavbarBlock";
import { HeroBlock, HeroInspector } from "./HeroBlock";
import { FeaturesBlock, FeaturesInspector } from "./FeaturesBlock";
import { FooterBlock, FooterInspector } from "./FooterBlock";
import { WireBoxBlock, WireBoxInspector } from "./WireBoxBlock";
import { TextSkeletonBlock, TextSkeletonInspector } from "./TextSkeletonBlock";
import { ColumnsBlock, ColumnsInspector } from "./ColumnsBlock";
import { FormSkeletonBlock, FormSkeletonInspector } from "./FormSkeletonBlock";
import { DataListBlock, DataListInspector } from "./DataListBlock";
import { TabsBlock, TabsInspector } from "./TabsBlock";
import { StackBlock, StackInspector } from "./StackBlock";
import { ButtonAtomBlock, ButtonAtomInspector } from "./ButtonAtomBlock";

export interface BlockRegistryEntry {
  Component: React.FC<any>;
  Inspector: React.FC<any>;
}

export const BlockComponents: Record<string, BlockRegistryEntry> = {
  NAVBAR: { Component: NavbarBlock, Inspector: NavbarInspector },
  HERO: { Component: HeroBlock, Inspector: HeroInspector },
  FEATURES: { Component: FeaturesBlock, Inspector: FeaturesInspector },
  FOOTER: { Component: FooterBlock, Inspector: FooterInspector },
  WIREBOX: { Component: WireBoxBlock, Inspector: WireBoxInspector },
  TEXTSKELETON: { Component: TextSkeletonBlock, Inspector: TextSkeletonInspector },
  COLUMNS: { Component: ColumnsBlock, Inspector: ColumnsInspector },
  FORMSKELETON: { Component: FormSkeletonBlock, Inspector: FormSkeletonInspector },
  DATALIST: { Component: DataListBlock, Inspector: DataListInspector },
  TABS: { Component: TabsBlock, Inspector: TabsInspector },
  STACK: { Component: StackBlock, Inspector: StackInspector },
  BUTTON_ATOM: { Component: ButtonAtomBlock, Inspector: ButtonAtomInspector },
};

export const BlockCategories = {
  "Layout & Contenitori": [
    { type: "STACK", label: "Auto-Layout (Flex)" },
    { type: "COLUMNS", label: "Spazio Colonne" },
  ],
  "Atomi (Singoli)": [
    { type: "BUTTON_ATOM", label: "Bottone" },
    { type: "WIREBOX", label: "Immagine (Box)" },
    { type: "TEXTSKELETON", label: "Testi Base" },
  ],
  "Molecole (UI)": [
    { type: "FORMSKELETON", label: "Modulo Form" },
    { type: "DATALIST", label: "Lista Dati" },
    { type: "TABS", label: "Navigazione Tabs" },
  ],
  "Organismi (Sezioni)": [
    { type: "HERO", label: "Hero Section" },
    { type: "FEATURES", label: "Griglia Features" },
    { type: "NAVBAR", label: "Navbar" },
    { type: "FOOTER", label: "Footer" },
  ],
};
