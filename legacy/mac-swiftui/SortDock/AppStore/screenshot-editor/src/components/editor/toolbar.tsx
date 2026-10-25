"use client";
import * as React from "react";
import { AlertTriangle, Check, Cloud, Download, Redo2, RotateCcw, Undo2, UnfoldHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SCREENSHOT_FONTS, THEMES } from "@/lib/constants";
import type { ImportedFont, ScreenshotFontId } from "@/lib/types";
import { FontImporter } from "./font-importer";

type Props = {
  appName: string; setAppName: (value: string) => void;
  connectedCanvas: boolean; setConnectedCanvas: (value: boolean) => void;
  themeId: string; setThemeId: (value: string) => void;
  fontId: ScreenshotFontId; setFontId: (value: ScreenshotFontId) => void;
  importedFont?: ImportedFont; setImportedFont: (font: ImportedFont) => void;
  onExport: () => void; onResetAll: () => void;
  onUndo: () => void; onRedo: () => void; canUndo: boolean; canRedo: boolean;
  exporting: string | null; savedAt: number | null; saveError: string | null; busy: boolean;
};

export function Toolbar(props: Props) {
  const [resetOpen, setResetOpen] = React.useState(false);
  return <div className="flex flex-wrap items-center gap-x-2 gap-y-1.5 border-b bg-card/40 px-4 py-2">
    <Input value={props.appName} onChange={(event) => props.setAppName(event.target.value)} className="h-8 w-40 border-dashed text-sm font-semibold" aria-label="App name" disabled={props.busy} />
    <span className="text-xs font-medium text-muted-foreground">Mac App Store · 2880 × 1800</span>
    <span aria-hidden className="mx-1 h-5 w-px bg-border" />
    <Button type="button" variant={props.connectedCanvas ? "secondary" : "outline"} size="sm" className="h-8 gap-1.5 px-2 text-xs" onClick={() => props.setConnectedCanvas(!props.connectedCanvas)} aria-pressed={props.connectedCanvas} disabled={props.busy}><UnfoldHorizontal className="h-3.5 w-3.5" />{props.connectedCanvas ? "Connected" : "Isolated"}</Button>
    <Select value={props.themeId} onValueChange={props.setThemeId} disabled={props.busy}><SelectTrigger className="h-8 w-40 text-xs" aria-label="Screenshot theme"><SelectValue /></SelectTrigger><SelectContent>{Object.values(THEMES).map((theme) => <SelectItem key={theme.id} value={theme.id}>{theme.name}</SelectItem>)}</SelectContent></Select>
    <Select value={props.fontId} onValueChange={(fontId) => props.setFontId(fontId as ScreenshotFontId)} disabled={props.busy}><SelectTrigger className="h-8 w-44 text-xs" aria-label="Screenshot font"><SelectValue /></SelectTrigger><SelectContent>{Object.entries(SCREENSHOT_FONTS).map(([id, font]) => <SelectItem key={id} value={id}>{font.name}</SelectItem>)}</SelectContent></Select>
    {props.fontId === "self-hosted" && <FontImporter disabled={props.busy} importedFont={props.importedFont} onImported={props.setImportedFont} />}
    <div className="ml-auto flex shrink-0 items-center gap-2"><SaveStatus savedAt={props.savedAt} saveError={props.saveError} /><Button type="button" variant="ghost" size="icon" className="h-8 w-8" onClick={props.onUndo} title="Undo (⌘Z)" disabled={props.busy || !props.canUndo}><Undo2 className="h-4 w-4" /></Button><Button type="button" variant="ghost" size="icon" className="h-8 w-8" onClick={props.onRedo} title="Redo (⌘⇧Z)" disabled={props.busy || !props.canRedo}><Redo2 className="h-4 w-4" /></Button><Button type="button" variant="ghost" size="icon" className="h-8 w-8" onClick={() => setResetOpen(true)} title="Reset SortDock screens" disabled={props.busy}><RotateCcw className="h-4 w-4" /></Button><Button onClick={props.onExport} disabled={!!props.exporting} size="sm" className="h-8"><Download className="h-4 w-4" />{props.exporting ? `Exporting ${props.exporting}` : "Export PNG bundle"}</Button></div>
    <Dialog open={resetOpen} onOpenChange={setResetOpen}><DialogContent className="max-w-md"><DialogHeader><DialogTitle>Restore the SortDock starter deck?</DialogTitle><DialogDescription>Your current copy, layouts, and placements will be replaced. Uploaded images stay on disk.</DialogDescription></DialogHeader><div className="flex justify-end gap-2"><Button variant="ghost" size="sm" onClick={() => setResetOpen(false)}>Cancel</Button><Button variant="destructive" size="sm" onClick={() => { setResetOpen(false); props.onResetAll(); }}>Restore deck</Button></div></DialogContent></Dialog>
  </div>;
}

function SaveStatus({ savedAt, saveError }: { savedAt: number | null; saveError: string | null }) {
  if (saveError) return <span className="flex items-center gap-1 text-xs text-destructive" title={saveError}><AlertTriangle className="h-3.5 w-3.5" /> save failed</span>;
  if (!savedAt) return <span className="flex items-center gap-1 text-xs text-muted-foreground"><Cloud className="h-3.5 w-3.5" /> not saved yet</span>;
  return <span className="flex items-center gap-1 text-xs text-muted-foreground"><Check className="h-3.5 w-3.5" /> saved</span>;
}
