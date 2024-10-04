const createURL = (path: string) => {
  return window.location.origin + path
}

export const createNewEntry = async () => {
  try {
    const res = await fetch(
      new Request(createURL('/api/journal'), {
        method: 'POST',
      }),
    )

    if (res.ok) {
      const data = await res.json()
      return data.data
    }
  } catch (error) {
    console.log('error:', error)
    return null
  }
}

export const updateEntry = async (id: string, content: string) => {
  const res = await fetch(
    new Request(createURL(`/api/journal/${id}`), {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ content }),
    }),
  )

  if (res.ok) {
    const data = await res.json()
    return data.data
  }
}
export const updateAnalysis = async (id: string, content: string) => {
  try {
    const res = await fetch(
      new Request(createURL(`/api/journal/${id}/analysis`), {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content }),
      }),
    )

    if (res.ok) {
      const data = await res.json()
      return data.data
    }
  } catch (error) {
    console.log('error:', error)
    return null
  }
}
