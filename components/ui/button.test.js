import { render, screen } from '@testing-library/react'
import { Button } from './Button'   // pakai named import

test('menampilkan label tombol', () => {
  render(<Button> Kirim </Button>)   // Button pakai children, bukan prop label
  expect(screen.getByText('Kirim')).toBeInTheDocument()
})