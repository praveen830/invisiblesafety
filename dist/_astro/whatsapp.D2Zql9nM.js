import{c as s}from"./createLucideIcon.DYkdPmV2.js";/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const u=[["path",{d:"M7.9 20A9 9 0 1 0 4 16.1L2 22Z",key:"vv11sd"}]],d=s("MessageCircle",u),n={name:"InvisProtect",phone:"+91 99896 45222",phoneRaw:"+919989645222",whatsapp:"919989645222"};function h(e){const t=[`Hello ${n.name},`,"I am interested in a quote.","",`Product: ${e.product}`];e.width&&e.height&&t.push(`Dimensions: ${e.width} × ${e.height} ${e.unit||"ft"}`),e.area&&t.push(`Area: ${e.area}`),e.configuration&&t.push(`Configuration: ${e.configuration}`),e.addons&&e.addons.length>0&&t.push(`Add-ons: ${e.addons.join(", ")}`),e.estimatedAmount&&t.push(`Estimated amount: ${e.estimatedAmount}`),e.location&&t.push(`Location / Area: ${e.location}`),e.leadSource&&t.push(`Enquiry Source: ${e.leadSource}`),t.push(""),t.push("Please arrange a site measurement.");const o=t.join(`
`),i=encodeURIComponent(o);return`https://wa.me/${n.whatsapp}?text=${i}`}export{d as M,n as a,h as b};
