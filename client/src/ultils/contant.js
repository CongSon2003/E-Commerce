import path from "./path";
import { MdDashboard } from "react-icons/md";
import { IoIosCreate } from "react-icons/io";
import { MdManageAccounts } from "react-icons/md";
import { FaHistory, FaRegUser } from "react-icons/fa";
import { IoCartOutline } from "react-icons/io5";
import { CgMenuBoxed } from "react-icons/cg";
export const exchangeRate =  0.0000382340; // 1 VND = 0.000042 USD
export const navigation = [
  {
    id: 1,
    value: "HOME",
    path: `/${path.HOME_URL}`,
  },
  {
    id: 2,
    value: "PRODUCTS",
    path: `/products/all`,
  },
  {
    id: 3,
    value: "PAGES",
    type : 'parent',
    path: `/${path.PAGE_CONTATS_US_URL}`,
    submenu : [
      {
        text : 'About Us',
        path : `/pages/about-us`
      },
      {
        text : 'Our Services',
        path : `/pages/services`
      },
      {
        text : 'FAQs',
        path : `/pages/faq`
      },
      {
        text : 'Typography',
        path : `/pages/typography`
      },
      {
        text : 'Heading',
        path : `/pages/heading`
      }
    ]
  },
  {
    id: 4,
    value: "BLOGS",
    path: `/${path.BLOGS_URL}`,
  },
];
export const productTabs = [
  {
    id: 1,
    title: "",
    name: "Description",
    content:
      "Technology: GSM / HSPA / LTE Dimensions: 153.8 x 75.5 x 7.6 mm Weight: 154 g Display: IPS LCD 5.5 inches Resolution: 720 x 1280 OS: Android OS, v6.0 (Marshmallow) Chipset: Octa-core CPU: Octa-core Internal: 32 GB, 4 GB RAM Camera: 13MB - 20 MP",
  },
  {
    id: 2,
    name: "Warranty",
    title: "Warranty Information",
    content:
      "LIMITED WARRANTIES Limited Warranties are non-transferable. The following Limited Warranties are given to the original retail purchaser of the following Ashley Furniture Industries, Inc.Products:Frames Used In Upholstered and Leather Products Limited Lifetime Warranty A Limited Lifetime Warranty applies to all frames used in sofas, couches, love seats, upholstered chairs, ottomans, sectionals, and sleepers. Ashley Furniture Industries,Inc. warrants these components to you, the original retail purchaser, to be free from material manufacturing defects.",
  },
  {
    id: 3,
    name: "Delivery",
    title: "Purchasing & Delivery",
    content:
      "Before you make your purchase, it’s helpful to know the measurements of the area you plan to place the furniture. You should also measure any doorways and hallways through which the furniture will pass to get to its final destination. Picking up at the store Shopify Shop requires that all products are properly inspected BEFORE you take it home to insure there are no surprises. Our team is happy to open all packages and will assist in the inspection process. We will then reseal packages for safe transport. We encourage all customers to bring furniture pads or blankets to protect the items during transport as well as rope or tie downs. Shopify Shop will not be responsible for damage that occurs after leaving the store or during transit. It is the purchaser’s responsibility to make sure the correct items are picked up and in good condition. Delivery Customers are able to pick the next available delivery day that best fits their schedule. However, to route stops as efficiently as possible, Shopify Shop will provide the time frame. Customers will not be able to choose a time. You will be notified in advance of your scheduled time frame. Please make sure that a responsible adult (18 years or older) will be home at that time. In preparation for your delivery, please remove existing furniture, pictures, mirrors, accessories, etc. to prevent damages. Also insure that the area where you would like your furniture placed is clear of any old furniture and any other items that may obstruct the passageway of the delivery team. Shopify Shop will deliver, assemble, and set-up your new furniture purchase and remove all packing materials from your home. Our delivery crews are not permitted to move your existing furniture or other household items. Delivery personnel will attempt to deliver the purchased items in a safe and controlled manner but will not attempt to place furniture if they feel it will result in damage to the product or your home. Delivery personnel are unable to remove doors, hoist furniture or carry furniture up more than 3 flights of stairs. An elevator must be available for deliveries to the 4th floor and above.",
  },
  {
    id: 4,
    title: "Purchasing & Delivery",
    name: "Payment",
    content:
      "Before you make your purchase, it’s helpful to know the measurements of the area you plan to place the furniture. You should also measure any doorways and hallways through which the furniture will pass to get to its final destination. Picking up at the store Shopify Shop requires that all products are properly inspected BEFORE you take it home to insure there are no surprises. Our team is happy to open all packages and will assist in the inspection process. We will then reseal packages for safe transport. We encourage all customers to bring furniture pads or blankets to protect the items during transport as well as rope or tie downs. Shopify Shop will not be responsible for damage that occurs after leaving the store or during transit. It is the purchaser’s responsibility to make sure the correct items are picked up and in good condition. Delivery Customers are able to pick the next available delivery day that best fits their schedule. However, to route stops as efficiently as possible, Shopify Shop will provide the time frame. Customers will not be able to choose a time. You will be notified in advance of your scheduled time frame. Please make sure that a responsible adult (18 years or older) will be home at that time. In preparation for your delivery, please remove existing furniture, pictures, mirrors, accessories, etc. to prevent damages. Also insure that the area where you would like your furniture placed is clear of any old furniture and any other items that may obstruct the passageway of the delivery team. Shopify Shop will deliver, assemble, and set-up your new furniture purchase and remove all packing materials from your home. Our delivery crews are not permitted to move your existing furniture or other household items. Delivery personnel will attempt to deliver the purchased items in a safe and controlled manner but will not attempt to place furniture if they feel it will result in damage to the product or your home. Delivery personnel are unable to remove doors, hoist furniture or carry furniture up more than 3 flights of stairs. An elevator must be available for deliveries to the 4th floor and above.",
  },
];
export const colors = [
  "black",
  "white",
  "red",
  "gray",
  "pink",
  "yellow",
  "orange",
  "purple",
  "green",
  "blue",
];
export const voteOptions = [
  {
    id: 1,
    text: "Terrible",
  },
  {
    id: 2,
    text: "Bad",
  },
  {
    id: 3,
    text: "Neutral",
  },
  {
    id: 4,
    text: "Good",
  },
  {
    id: 5,
    text: "Perfect",
  },
];
export const adminSideBar = [
  {
    id : 1,
    type : 'single',
    text : 'Dashboard',
    path : `/${path.ADMIN_URL}/${path.DASHBOARD_URL}`,
    icon : <MdDashboard/>
  },
  {
    id : 2,
    type : 'single',
    text : 'Manage users',
    path : `/${path.ADMIN_URL}/${path.MANAGER_USERS_URL}`,
    icon : <FaRegUser/>
  },
  {
    id : 3,
    type : 'parent',
    text : 'Manager products',
    path : `/${path.ADMIN_URL}/${path.MANAGER_PRODUCTS_URL}`,
    icon : <IoCartOutline/>,
    submenu : [
      { 
        text : 'Create product',
        path : `/${path.ADMIN_URL}/${path.CREATE_PRODUCT}`,
        icon : <IoIosCreate/>
      },
      {
        text : 'Manage products',
        path : `/${path.ADMIN_URL}/${path.MANAGER_PRODUCTS_URL}`,
        icon : <MdManageAccounts/>
      }
    ]
  },
  {
    id : 4,
    type : 'single',
    text : 'Manage orders',
    path : `/${path.ADMIN_URL}/${path.MANAGER_ORDERS}`,
    icon : <CgMenuBoxed/>
  },
]
export const userSideBar = [
  {
    id : 1,
    type : 'single',
    text : 'Personal',
    path : `/${path.MEMBER_URL}/${path.PERSONAL_URL}`,
    icon : <MdDashboard/>
  },
  {
    id : 2,
    type : 'single',
    text : 'My cart',
    path : `/${path.MEMBER_URL}/${path.MYCART_URL}`,
    icon : <FaRegUser/>
  },
  {
    id : 3,
    type : 'single',
    text : 'Purchase history',
    path : `/${path.MEMBER_URL}/${path.PURCHASE_HISTORY_URL}`,
    icon : <FaHistory/>
  },
  {
    id : 4,
    type : 'single',
    text : 'Whishlist',
    path : `/${path.MEMBER_URL}/${path.WISHLIST_URL}`,
    icon : <CgMenuBoxed/>
  },
]
export const roles = [
  {
    code : 1945,
    value : 'admin'
  },
  {
    code : 1975,
    value : 'user'
  }
]
export const EstimatedTaxes = [
  {
    currency : 'VND',
    Tax : 1000
  }
]