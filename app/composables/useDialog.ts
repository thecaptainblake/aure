export const useDialog = (open: Ref<boolean>, panel: Ref<HTMLElement | null>) => {
  const previousFocus = ref<HTMLElement | null>(null)

  const handleKeydown = (event: KeyboardEvent) => {
    if (!open.value) return

    if (event.key === 'Escape') {
      open.value = false
      return
    }

    if (event.key !== 'Tab') return

    const root = panel.value
    if (!root) return

    const items = [
      ...root.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
      ),
    ]
    const first = items[0]
    const last = items[items.length - 1]
    if (!first || !last) return

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault()
      last.focus()
      return
    }

    if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault()
      first.focus()
    }
  }

  const release = () => {
    document.body.style.overflow = ''
    window.removeEventListener('keydown', handleKeydown)
  }

  watch(open, (isOpen) => {
    if (!import.meta.client) return

    if (!isOpen) {
      release()
      previousFocus.value?.focus()
      return
    }

    previousFocus.value =
      document.activeElement instanceof HTMLElement ? document.activeElement : null
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleKeydown)
    nextTick(() => {
      panel.value
        ?.querySelector<HTMLElement>('button, [href], input, select, textarea')
        ?.focus()
    })
  })

  onUnmounted(() => {
    if (!import.meta.client) return
    release()
  })
}
