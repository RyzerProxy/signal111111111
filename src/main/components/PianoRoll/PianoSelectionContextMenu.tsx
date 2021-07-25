import { Divider, Menu } from "@material-ui/core"
import React, { FC, useCallback } from "react"
import { IPoint } from "../../../common/geometry"
import { localized } from "../../../common/localize/localizedString"
import {
  copySelection,
  deleteSelection,
  duplicateSelection,
  pasteSelection,
  transposeSelection,
} from "../../actions"
import { useStores } from "../../hooks/useStores"
import {
  ContextMenuHotKey as HotKey,
  ContextMenuItem as Item,
} from "../ContextMenu/ContextMenu"

export interface PianoSelectionContextMenuProps {
  isOpen: boolean
  position: IPoint
  handleClose: () => void
}

export const PianoSelectionContextMenu: FC<PianoSelectionContextMenuProps> =
  React.memo(({ isOpen, position, handleClose }) => {
    const rootStore = useStores()
    const isNoteSelected =
      (rootStore.pianoRollStore.selection?.noteIds ?? []).length > 0

    const onClickCut = useCallback(() => {
      copySelection(rootStore)()
      deleteSelection(rootStore)()
      handleClose()
    }, [])

    const onClickCopy = useCallback(() => {
      copySelection(rootStore)()
      handleClose()
    }, [])

    const onClickPaste = useCallback(() => {
      pasteSelection(rootStore)()
      handleClose()
    }, [])

    const onClickDuplicate = useCallback(() => {
      duplicateSelection(rootStore)()
      handleClose()
    }, [])

    const onClickDelete = useCallback(() => {
      deleteSelection(rootStore)()
      handleClose()
    }, [])

    const onClickOctaveUp = useCallback(() => {
      transposeSelection(rootStore)(12)
      handleClose()
    }, [])

    const onClickOctaveDown = useCallback(() => {
      transposeSelection(rootStore)(-12)
      handleClose()
    }, [])

    return (
      <Menu
        open={isOpen}
        onClose={handleClose}
        anchorReference="anchorPosition"
        anchorPosition={{ top: position.y, left: position.x }}
        autoFocus={false}
        disableEnforceFocus={true}
        disableAutoFocus={true}
        disableAutoFocusItem={true}
        disableRestoreFocus={true}
        disablePortal
        transitionDuration={0}
        MenuListProps={{
          disableListWrap: true,
          disablePadding: true,
          style: { padding: "inherit", width: "inherit" },
        }}
      >
        <Item onClick={onClickCut} disabled={!isNoteSelected}>
          {localized("cut", "Cut")}
          <HotKey>Ctrl+X</HotKey>
        </Item>
        <Item onClick={onClickCopy} disabled={!isNoteSelected}>
          {localized("copy", "Copy")}
          <HotKey>Ctrl+C</HotKey>
        </Item>
        <Item onClick={onClickPaste}>
          {localized("paste", "Paste")}
          <HotKey>Ctrl+V</HotKey>
        </Item>
        <Item onClick={onClickDuplicate} disabled={!isNoteSelected}>
          {localized("duplicate", "Duplicate")}
          <HotKey>Ctrl+D</HotKey>
        </Item>
        <Item onClick={onClickDelete} disabled={!isNoteSelected}>
          {localized("delete", "Delete")}
          <HotKey>Del</HotKey>
        </Item>
        <Divider />
        <Item onClick={onClickOctaveUp} disabled={!isNoteSelected}>
          {localized("one-octave-up", "+1 Oct")}
          <HotKey>Shift+↑</HotKey>
        </Item>
        <Item onClick={onClickOctaveDown} disabled={!isNoteSelected}>
          {localized("one-octave-down", "-1 Oct")}
          <HotKey>Shift+↓</HotKey>
        </Item>
      </Menu>
    )
  })
