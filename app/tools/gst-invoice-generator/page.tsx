"use client";
import { useState, useRef } from "react";
import ToolPageWrapper from "@/components/ToolPageWrapper";

type Item = { id: string; desc: string; hsn: string; qty: string; rate: string; gst: number };

const EMPTY_ITEM = (): Item => ({
  id: Math.random().toString(36).slice(2),
  desc: "", hsn: "", qty: "1", rate: "", gst: 18,
});

const INDIAN_STATES = [
  "Andhra Pradesh","Arunachal Pradesh","Assam","Bihar","Chhattisgarh","Delhi","Goa","Gujarat",
  "Haryana","Himachal Pradesh","Jharkhand","Karnataka","Kerala","Madhya Pradesh","Maharashtra",
  "Manipur","Meghalaya","Mizoram","Nagaland","Odisha","Punjab","Rajasthan","Sikkim","Tamil Nadu",
  "Telangana","Tripura","Uttar Pradesh","Uttarakhand","West Bengal","Jammu and Kashmir","Ladakh",
  "Chandigarh","Puducherry","Andaman and Nicobar Islands","Dadra and Nagar Haveli and Daman and Diu",
  "Lakshadweep",
];

const GST_RATES = [0, 3, 5, 12, 18, 28];

const ONES = ["","One","Two","Three","Four","Five","Six","Seven","Eight","Nine","Ten","Eleven","Twelve","Thirteen","Fourteen","Fifteen","Sixteen","Seventeen","Eighteen","Nineteen"];
const TENS = ["","","Twenty","Thirty","Forty","Fifty","Sixty","Seventy","Eighty","Ninety"];

function numToWords(n: number): string {
  if (n === 0) return "Zero";
  const twoDigit = (num: number): string => {
    if (num < 20) return ONES[num];
    return TENS[Math.floor(num / 10)] + (num % 10 ? " " + ONES[num % 10] : "");
  };
  const threeDigit = (num: number): string => {
    if (num < 100) return twoDigit(num);
    return ONES[Math.floor(num / 100)] + " Hundred" + (num % 100 ? " " + twoDigit(num % 100) : "");
  };
  let result = "";
  const crore = Math.floor(n / 10000000); n %= 10000000;
  const lakh  = Math.floor(n / 100000);    n %= 100000;
  const thousand = Math.floor(n / 1000);   n %= 1000;
  const hundred = n;
  if (crore) result += threeDigit(crore) + " Crore ";
  if (lakh) result += threeDigit(lakh) + " Lakh ";
  if (thousand) result += threeDigit(thousand) + " Thousand ";
  if (hundred) result += threeDigit(hundred);
  return result.trim();
}

function amountInWords(amount: number): string {
  const rupees = Math.floor(amount);
  const paise = Math.round((amount - rupees) * 100);
  let words = "Rupees " + numToWords(rupees);
  if (paise > 0) words += " and " + numToWords(paise) + " Paise";
  return words + " Only";
}

export default function GSTInvoiceGeneratorPage() {
  const previewRef = useRef<HTMLDivElement>(null);
  const [downloading, setDownloading] = useState(false);

  const [seller, setSeller] = useState({ name: "", address: "", gstin: "", state: "Maharashtra", phone: "", email: "" });
  const [buyer, setBuyer]   = useState({ name: "", address: "", gstin: "", state: "Maharashtra" });
  const [meta, setMeta] = useState(() => ({
    invoiceNo: "INV-" + Math.floor(1000 + Math.random() * 9000),
    date: new Date().toISOString().slice(0, 10),
    dueDate: "",
  }));
  const [items, setItems] = useState<Item[]>(() => [EMPTY_ITEM()]);
  const [bank, setBank]   = useState({ accName: "", accNumber: "", ifsc: "", bankName: "" });
  const [notes, setNotes] = useState("Thank you for your business.");

  const updateItem = (id: string, field: keyof Item, value: string | number) => {
    setItems(prev => prev.map(it => it.id === id ? { ...it, [field]: value } : it));
  };
  const addItem = () => setItems(prev => [...prev, EMPTY_ITEM()]);
  const removeItem = (id: string) => setItems(prev => prev.length > 1 ? prev.filter(it => it.id !== id) : prev);

  const isIntraState = seller.state === buyer.state;

  const lineCalc = (it: Item) => {
    const qty = parseFloat(it.qty) || 0;
    const rate = parseFloat(it.rate) || 0;
    const base = qty * rate;
    const gstAmt = (base * it.gst) / 100;
    return { base, gstAmt, total: base + gstAmt };
  };

  const subtotal = items.reduce((s, it) => s + lineCalc(it).base, 0);
  const totalGst = items.reduce((s, it) => s + lineCalc(it).gstAmt, 0);
  const grandTotal = subtotal + totalGst;

  const fmt = (n: number) => `₹${n.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

  const downloadPDF = async () => {
    if (!previewRef.current) return;
    setDownloading(true);
    try {
      const { default: html2canvas } = await import("html2canvas");
      const { jsPDF } = await import("jspdf");
      const canvas = await html2canvas(previewRef.current, {
        scale: 2, useCORS: true, backgroundColor: "#ffffff",
        width: previewRef.current.scrollWidth,
        height: previewRef.current.scrollHeight,
      });
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
      const pdfW = pdf.internal.pageSize.getWidth();
      const pdfH = (canvas.height * pdfW) / canvas.width;
      let heightLeft = pdfH;
      let position = 0;
      pdf.addImage(imgData, "PNG", 0, position, pdfW, pdfH);
      heightLeft -= pdf.internal.pageSize.getHeight();
      while (heightLeft > 0) {
        position = heightLeft - pdfH;
        pdf.addPage();
        pdf.addImage(imgData, "PNG", 0, position, pdfW, pdfH);
        heightLeft -= pdf.internal.pageSize.getHeight();
      }
      pdf.save(`${meta.invoiceNo || "invoice"}.pdf`);
    } catch (err) {
      console.error(err);
      alert("PDF download failed: " + (err instanceof Error ? err.message : "Unknown error") + "\n\nPlease screenshot this and share with support.");
    } finally {
      setDownloading(false);
    }
  };

  const inputCls = "w-full bg-black/80 border border-zinc-700 rounded-xl px-4 py-2.5 text-white text-sm outline-none focus:border-cyan-400 transition";
  const labelCls = "block text-gray-400 text-xs font-medium mb-1.5";

  return (
    <ToolPageWrapper badge="🧾 Finance Tool">
      <main className="px-6 py-12 pb-24 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">GST Invoice Generator</h1>
            <p className="text-gray-400">Create a professional GST invoice — auto CGST/SGST/IGST split, download as PDF. 100% free, nothing stored.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* ── FORM ── */}
            <div className="space-y-6">

              <div className="bg-black/40 backdrop-blur-sm border border-zinc-700/60 rounded-3xl p-6 space-y-4">
                <h2 className="text-lg font-bold text-cyan-400">Your Business (Seller)</h2>
                <div><label className={labelCls}>Business Name</label>
                  <input className={inputCls} value={seller.name} onChange={e => setSeller({ ...seller, name: e.target.value })} placeholder="Everyday Cyber AI Services" /></div>
                <div><label className={labelCls}>Address</label>
                  <textarea className={inputCls} rows={2} value={seller.address} onChange={e => setSeller({ ...seller, address: e.target.value })} placeholder="Shop no, Street, City, Pincode" /></div>
                <div className="grid grid-cols-2 gap-3">
                  <div><label className={labelCls}>GSTIN</label>
                    <input className={inputCls} value={seller.gstin} onChange={e => setSeller({ ...seller, gstin: e.target.value.toUpperCase() })} placeholder="27ABCDE1234F1Z5" /></div>
                  <div><label className={labelCls}>State</label>
                    <select className={inputCls} value={seller.state} onChange={e => setSeller({ ...seller, state: e.target.value })}>
                      {INDIAN_STATES.map(s => <option key={s} value={s}>{s}</option>)}
                    </select></div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div><label className={labelCls}>Phone</label>
                    <input className={inputCls} value={seller.phone} onChange={e => setSeller({ ...seller, phone: e.target.value })} placeholder="+91 98765 43210" /></div>
                  <div><label className={labelCls}>Email</label>
                    <input className={inputCls} value={seller.email} onChange={e => setSeller({ ...seller, email: e.target.value })} placeholder="you@business.com" /></div>
                </div>
              </div>

              <div className="bg-black/40 backdrop-blur-sm border border-zinc-700/60 rounded-3xl p-6 space-y-4">
                <h2 className="text-lg font-bold text-cyan-400">Bill To (Buyer)</h2>
                <div><label className={labelCls}>Client Name</label>
                  <input className={inputCls} value={buyer.name} onChange={e => setBuyer({ ...buyer, name: e.target.value })} placeholder="Client / Company Name" /></div>
                <div><label className={labelCls}>Address</label>
                  <textarea className={inputCls} rows={2} value={buyer.address} onChange={e => setBuyer({ ...buyer, address: e.target.value })} placeholder="Client address" /></div>
                <div className="grid grid-cols-2 gap-3">
                  <div><label className={labelCls}>GSTIN (optional)</label>
                    <input className={inputCls} value={buyer.gstin} onChange={e => setBuyer({ ...buyer, gstin: e.target.value.toUpperCase() })} placeholder="If registered" /></div>
                  <div><label className={labelCls}>State</label>
                    <select className={inputCls} value={buyer.state} onChange={e => setBuyer({ ...buyer, state: e.target.value })}>
                      {INDIAN_STATES.map(s => <option key={s} value={s}>{s}</option>)}
                    </select></div>
                </div>
              </div>

              <div className="bg-black/40 backdrop-blur-sm border border-zinc-700/60 rounded-3xl p-6 space-y-4">
                <h2 className="text-lg font-bold text-cyan-400">Invoice Details</h2>
                <div className="grid grid-cols-3 gap-3">
                  <div><label className={labelCls}>Invoice No.</label>
                    <input className={inputCls} value={meta.invoiceNo} onChange={e => setMeta({ ...meta, invoiceNo: e.target.value })} /></div>
                  <div><label className={labelCls}>Invoice Date</label>
                    <input type="date" className={inputCls} value={meta.date} onChange={e => setMeta({ ...meta, date: e.target.value })} /></div>
                  <div><label className={labelCls}>Due Date</label>
                    <input type="date" className={inputCls} value={meta.dueDate} onChange={e => setMeta({ ...meta, dueDate: e.target.value })} /></div>
                </div>
                <div className="bg-cyan-500/10 border border-cyan-500/20 rounded-xl px-4 py-2.5 text-xs text-cyan-300">
                  {isIntraState ? "📍 Same state — CGST + SGST will be applied" : "📍 Different state — IGST will be applied"}
                </div>
              </div>

              <div className="bg-black/40 backdrop-blur-sm border border-zinc-700/60 rounded-3xl p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-bold text-cyan-400">Items</h2>
                  <button onClick={addItem} className="text-xs bg-cyan-500/20 border border-cyan-500/40 text-cyan-400 px-3 py-1.5 rounded-lg hover:bg-cyan-500/30 transition">+ Add Item</button>
                </div>
                {items.map((it, idx) => (
                  <div key={it.id} className="bg-black/40 border border-zinc-800 rounded-xl p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500">Item {idx + 1}</span>
                      {items.length > 1 && <button onClick={() => removeItem(it.id)} className="text-xs text-red-400 hover:text-red-300">Remove</button>}
                    </div>
                    <input className={inputCls} value={it.desc} onChange={e => updateItem(it.id, "desc", e.target.value)} placeholder="Description of goods/service" />
                    <div className="grid grid-cols-4 gap-2">
                      <input className={inputCls} value={it.hsn} onChange={e => updateItem(it.id, "hsn", e.target.value)} placeholder="HSN/SAC" />
                      <input type="number" className={inputCls} value={it.qty} onChange={e => updateItem(it.id, "qty", e.target.value)} placeholder="Qty" />
                      <input type="number" className={inputCls} value={it.rate} onChange={e => updateItem(it.id, "rate", e.target.value)} placeholder="Rate ₹" />
                      <select className={inputCls} value={it.gst} onChange={e => updateItem(it.id, "gst", parseFloat(e.target.value))}>
                        {GST_RATES.map(r => <option key={r} value={r}>{r}% GST</option>)}
                      </select>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-black/40 backdrop-blur-sm border border-zinc-700/60 rounded-3xl p-6 space-y-4">
                <h2 className="text-lg font-bold text-cyan-400">Bank Details (optional)</h2>
                <div className="grid grid-cols-2 gap-3">
                  <input className={inputCls} value={bank.accName} onChange={e => setBank({ ...bank, accName: e.target.value })} placeholder="Account Holder Name" />
                  <input className={inputCls} value={bank.accNumber} onChange={e => setBank({ ...bank, accNumber: e.target.value })} placeholder="Account Number" />
                  <input className={inputCls} value={bank.ifsc} onChange={e => setBank({ ...bank, ifsc: e.target.value.toUpperCase() })} placeholder="IFSC Code" />
                  <input className={inputCls} value={bank.bankName} onChange={e => setBank({ ...bank, bankName: e.target.value })} placeholder="Bank Name" />
                </div>
                <div><label className={labelCls}>Notes / Terms</label>
                  <textarea className={inputCls} rows={2} value={notes} onChange={e => setNotes(e.target.value)} /></div>
              </div>

              <button onClick={downloadPDF} disabled={downloading}
                className="w-full bg-cyan-500 hover:bg-cyan-400 disabled:opacity-50 text-black py-4 rounded-2xl font-bold text-lg transition">
                {downloading ? "Generating PDF..." : "⬇️ Download Invoice PDF"}
              </button>
            </div>

            {/* ── PREVIEW ── */}
            <div className="lg:sticky lg:top-24 self-start">
              <div ref={previewRef} className="rounded-2xl p-8 shadow-2xl" style={{ minHeight: 600, backgroundColor: "#ffffff", color: "#000000" }}>
                <div className="flex justify-between items-start pb-4 mb-4" style={{ borderBottom: "2px solid #1f2937" }}>
                  <div>
                    <h2 className="text-2xl font-bold">{seller.name || "Your Business Name"}</h2>
                    <p className="text-xs whitespace-pre-line mt-1" style={{ color: "#4b5563" }}>{seller.address || "Business Address"}</p>
                    {seller.gstin && <p className="text-xs mt-1" style={{ color: "#4b5563" }}>GSTIN: {seller.gstin}</p>}
                    {seller.phone && <p className="text-xs" style={{ color: "#4b5563" }}>Phone: {seller.phone}</p>}
                    {seller.email && <p className="text-xs" style={{ color: "#4b5563" }}>{seller.email}</p>}
                  </div>
                  <div className="text-right">
                    <h1 className="text-3xl font-bold" style={{ color: "#1f2937" }}>TAX INVOICE</h1>
                    <p className="text-sm mt-2"><b>Invoice #:</b> {meta.invoiceNo}</p>
                    <p className="text-sm"><b>Date:</b> {meta.date}</p>
                    {meta.dueDate && <p className="text-sm"><b>Due:</b> {meta.dueDate}</p>}
                  </div>
                </div>

                <div className="mb-4">
                  <p className="text-xs uppercase font-semibold" style={{ color: "#6b7280" }}>Bill To</p>
                  <p className="font-bold">{buyer.name || "Client Name"}</p>
                  <p className="text-xs whitespace-pre-line" style={{ color: "#4b5563" }}>{buyer.address}</p>
                  {buyer.gstin && <p className="text-xs" style={{ color: "#4b5563" }}>GSTIN: {buyer.gstin}</p>}
                  <p className="text-xs" style={{ color: "#4b5563" }}>State: {buyer.state}</p>
                </div>

                <table className="w-full text-xs mb-4">
                  <thead>
                    <tr style={{ backgroundColor: "#1f2937", color: "#ffffff" }}>
                      <th className="p-2 text-left">Description</th>
                      <th className="p-2 text-left">HSN</th>
                      <th className="p-2 text-right">Qty</th>
                      <th className="p-2 text-right">Rate</th>
                      <th className="p-2 text-right">GST%</th>
                      <th className="p-2 text-right">Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {items.map((it, idx) => {
                      const c = lineCalc(it);
                      return (
                        <tr key={it.id} style={idx % 2 ? { backgroundColor: "#f9fafb" } : undefined}>
                          <td className="p-2">{it.desc || "-"}</td>
                          <td className="p-2">{it.hsn || "-"}</td>
                          <td className="p-2 text-right">{it.qty || 0}</td>
                          <td className="p-2 text-right">{fmt(parseFloat(it.rate) || 0)}</td>
                          <td className="p-2 text-right">{it.gst}%</td>
                          <td className="p-2 text-right">{fmt(c.total)}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>

                <div className="flex justify-end mb-4">
                  <div className="w-64 text-sm space-y-1">
                    <div className="flex justify-between"><span style={{ color: "#4b5563" }}>Subtotal</span><span>{fmt(subtotal)}</span></div>
                    {isIntraState ? (
                      <>
                        <div className="flex justify-between"><span style={{ color: "#4b5563" }}>CGST</span><span>{fmt(totalGst / 2)}</span></div>
                        <div className="flex justify-between"><span style={{ color: "#4b5563" }}>SGST</span><span>{fmt(totalGst / 2)}</span></div>
                      </>
                    ) : (
                      <div className="flex justify-between"><span style={{ color: "#4b5563" }}>IGST</span><span>{fmt(totalGst)}</span></div>
                    )}
                    <div className="flex justify-between font-bold text-base pt-2" style={{ borderTop: "1px solid #d1d5db" }}><span>Grand Total</span><span>{fmt(grandTotal)}</span></div>
                  </div>
                </div>

                <p className="text-xs italic mb-4" style={{ color: "#4b5563" }}>{amountInWords(grandTotal)}</p>

                {(bank.accName || bank.accNumber) && (
                  <div className="pt-3 mb-3 text-xs" style={{ borderTop: "1px solid #d1d5db", color: "#4b5563" }}>
                    <p className="font-semibold mb-1" style={{ color: "#1f2937" }}>Bank Details</p>
                    {bank.accName && <p>A/c Name: {bank.accName}</p>}
                    {bank.accNumber && <p>A/c No: {bank.accNumber}</p>}
                    {bank.ifsc && <p>IFSC: {bank.ifsc}</p>}
                    {bank.bankName && <p>Bank: {bank.bankName}</p>}
                  </div>
                )}

                {notes && <p className="text-xs pt-3" style={{ color: "#6b7280", borderTop: "1px solid #d1d5db" }}>{notes}</p>}
              </div>
            </div>
          </div>
        </div>
      </main>
    </ToolPageWrapper>
  );
}
