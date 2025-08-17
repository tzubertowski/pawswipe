export const useDynamicMeta = () => {
  const updateMetaForPet = (animal: {
    id: string
    name: string
    type: string
    sex: string
    image: string
    description: string
    shelter: {
      name: string
    }
  }) => {
    if (typeof window === 'undefined') return
    
    const sexText = animal.sex === 'Samiec' ? 'Samiec' : animal.sex === 'Samica' ? 'Samica' : animal.sex
    const title = `PawSwipe: ${animal.name} - ${animal.type} - ${sexText}`
    const description = `${animal.name} to ${animal.type.toLowerCase()} (${sexText.toLowerCase()}) z ${animal.shelter.name}. ${animal.description.substring(0, 120)}...`
    const url = `${window.location.origin}${window.location.pathname}#${animal.id}`
    const image = animal.image.startsWith('http') ? animal.image : `${window.location.origin}${animal.image}`

    // Update document title
    document.title = title
    
    // Update or create meta tags
    const updateOrCreateMeta = (selector: string, content: string) => {
      let meta = document.querySelector(selector)
      if (meta) {
        meta.setAttribute('content', content)
      } else {
        meta = document.createElement('meta')
        if (selector.includes('property')) {
          const property = selector.match(/property="([^"]+)"/)?.[1]
          if (property) meta.setAttribute('property', property)
        } else {
          const name = selector.match(/name="([^"]+)"/)?.[1]
          if (name) meta.setAttribute('name', name)
        }
        meta.setAttribute('content', content)
        document.head.appendChild(meta)
      }
    }

    // Update all meta tags
    updateOrCreateMeta('meta[name="description"]', description)
    updateOrCreateMeta('meta[property="og:title"]', title)
    updateOrCreateMeta('meta[property="og:description"]', description)
    updateOrCreateMeta('meta[property="og:type"]', 'article')
    updateOrCreateMeta('meta[property="og:url"]', url)
    updateOrCreateMeta('meta[property="og:image"]', image)
    updateOrCreateMeta('meta[property="og:image:width"]', '600')
    updateOrCreateMeta('meta[property="og:image:height"]', '600')
    updateOrCreateMeta('meta[name="twitter:card"]', 'summary_large_image')
    updateOrCreateMeta('meta[name="twitter:title"]', title)
    updateOrCreateMeta('meta[name="twitter:description"]', description)
    updateOrCreateMeta('meta[name="twitter:image"]', image)
  }

  const resetToDefaultMeta = () => {
    if (typeof window === 'undefined') return
    
    const title = 'PawSwipe - Znajdź swojego przyjaciela'
    const description = 'Aplikacja do adopcji zwierząt ze schronisk w Polsce. Znajdź swojego nowego przyjaciela na łapkę!'
    const image = `${window.location.origin}/images/shelter-logo.jpg`
    
    // Update document title
    document.title = title
    
    // Update or create meta tags
    const updateOrCreateMeta = (selector: string, content: string) => {
      let meta = document.querySelector(selector)
      if (meta) {
        meta.setAttribute('content', content)
      }
    }

    // Reset all meta tags to default
    updateOrCreateMeta('meta[name="description"]', description)
    updateOrCreateMeta('meta[property="og:title"]', title)
    updateOrCreateMeta('meta[property="og:description"]', description)
    updateOrCreateMeta('meta[property="og:type"]', 'website')
    updateOrCreateMeta('meta[property="og:url"]', window.location.origin)
    updateOrCreateMeta('meta[property="og:image"]', image)
    updateOrCreateMeta('meta[name="twitter:title"]', title)
    updateOrCreateMeta('meta[name="twitter:description"]', description)
    updateOrCreateMeta('meta[name="twitter:image"]', image)
  }

  return {
    updateMetaForPet,
    resetToDefaultMeta
  }
}