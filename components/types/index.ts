import data from '../data/data.json';

export interface SocialItem {
  name: string;
  href: string;
  icon: string;
}

export interface TopBarData {
  address: string;
  phone: string;
  phone_href: string;
  email: string;
  email_href: string;
  socials: SocialItem[];
}

export interface NavItem {
  name: string;
  href: string;
}

export type LinkType = NavItem;

export interface CtaButtonData {
  text: string;
  href: string;
}

export interface HeaderData {
  top_bar: TopBarData;
  logo: string;
  logo_text: string;
  logo_subtext: string;
  links: LinkType[];
  cta_button: CtaButtonData;
  menu_aria_label: string;
  close_aria_label: string;
}

export interface HeroSectionData {
  eyebrow: string;
  headline_prefix: string;
  headline_highlight: string;
  description: string;
  button_text: string;
  button_link: string;
  image: string;
  image_alt: string;
}

export interface AboutFeatureItem {
  id: string;
  title: string;
  icon: string;
}

export interface AboutSectionData {
  eyebrow: string;
  heading_prefix: string;
  heading_highlight: string;
  description: string;
  badge_text: string;
  image: string;
  image_alt: string;
  features: AboutFeatureItem[];
}

export interface PropertySpec {
  icon: string;
  label: string;
}

export interface PropertyItem {
  id: string;
  title: string;
  badge: string;
  badge_variant: string;
  location: string;
  price: string;
  specs: PropertySpec[];
  image: string;
  image_alt: string;
}

export interface PropertiesSectionData {
  eyebrow: string;
  heading_prefix: string;
  heading_highlight: string;
  subtitle: string;
  items: PropertyItem[];
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  icon: string;
  image: string;
  image_alt: string;
}

export interface ServicesSectionData {
  eyebrow: string;
  heading_prefix: string;
  heading_highlight: string;
  subtitle: string;
  items: ServiceItem[];
}

export interface GalleryImageItem {
  id: string;
  src: string;
  alt: string;
  category: string;
}

export interface GallerySectionData {
  eyebrow: string;
  heading_prefix: string;
  heading_highlight: string;
  subtitle: string;
  images: GalleryImageItem[];
}

export interface TestimonialItem {
  id: string;
  quote: string;
  author_name: string;
  role: string;
  avatar: string;
  avatar_alt: string;
  rating: number;
}

export interface TestimonialsSectionData {
  eyebrow: string;
  heading_prefix: string;
  heading_highlight: string;
  subtitle: string;
  watermark_image: string;
  items: TestimonialItem[];
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export interface FaqSectionData {
  eyebrow: string;
  heading_prefix: string;
  heading_highlight: string;
  subtitle: string;
  items: FaqItem[];
}

export interface ContactCardItem {
  id: string;
  icon: string;
  title: string;
  line1: string;
  href?: string;
}

export interface ContactFormData {
  card_title: string;
  card_subtitle: string;
  name_label: string;
  name_placeholder: string;
  email_label: string;
  email_placeholder: string;
  phone_label: string;
  phone_placeholder: string;
  property_label: string;
  property_placeholder: string;
  property_options: string[];
  message_label: string;
  message_placeholder: string;
  submit_text: string;
  submitting_text: string;
  success_message: string;
}

export interface ContactSectionData {
  eyebrow: string;
  heading_prefix: string;
  heading_highlight: string;
  description: string;
  contact_cards: ContactCardItem[];
  form: ContactFormData;
}

export interface FooterData {
  logo: string;
  logo_text: string;
  logo_subtext: string;
  tagline: string;
  quick_links_title: string;
  quick_links: LinkType[];
  contact_title: string;
  address: string;
  phone: string;
  phone_href: string;
  email: string;
  email_href: string;
  copyright: string;
  socials: SocialItem[];
}

export interface BackToTopData {
  aria_label: string;
}

export interface PageComponent {
  key: string;
  component: string;
}

export interface PageMeta {
  title: string;
  pageName: string;
  metadata: {
    title: string;
    description: string;
  };
  components: PageComponent[];
}

export interface SiteSections {
  hero: HeroSectionData;
  about: AboutSectionData;
  properties: PropertiesSectionData;
  services: ServicesSectionData;
  gallery: GallerySectionData;
  testimonials: TestimonialsSectionData;
  faq: FaqSectionData;
  contact: ContactSectionData;
}

export interface SitePages {
  home: PageMeta;
}

export interface TemplateComponents {
  pages: SitePages;
  sections: SiteSections;
}

export interface SiteData {
  common: {
    Header: HeaderData;
    Footer: FooterData;
    BackToTop: BackToTopData;
  };
  categories: {
    RealEstateArchitecture: {
      templateComponents: {
        'template-1': TemplateComponents;
      };
    };
  };
}

export const siteJson: SiteData = data as unknown as SiteData;
export const common = siteJson.common;
export const template =
  siteJson.categories.RealEstateArchitecture.templateComponents['template-1'];
export const pages = template.pages;
export const sections = template.sections;

