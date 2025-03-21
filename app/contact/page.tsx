"use client";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Mail, MapPin, Phone } from "lucide-react"
import { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/contact', formData);
      Swal.fire({
        title: 'Success!',
        text: 'Your message has been sent successfully.',
        icon: 'success',
        confirmButtonText: 'OK'
      });
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        message: ''
      });
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: 'There was an error sending your message. Please try again later.',
        icon: 'error',
        confirmButtonText: 'OK'
      });
    }
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Contact Us</h1>

        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl font-semibold mb-4">Get in Touch</h2>
            <p className="text-muted-foreground mb-6">
              Have questions about our object detection and blurring solutions? We're here to help. Fill out the form
              and we'll get back to you as soon as possible.
            </p>

            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <h3 className="font-medium">Our Location</h3>
                  <p className="text-muted-foreground">123 Tech Avenue, Innovation District, CA 94103</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Mail className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <h3 className="font-medium">Email Us</h3>
                  <p className="text-muted-foreground">info@objectdetection.example</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Phone className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <h3 className="font-medium">Call Us</h3>
                  <p className="text-muted-foreground">+1 (555) 123-4567</p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="first-name" className="text-sm font-medium">First Name</label>
                  <Input id="first-name" name="firstName" type="text" onChange={handleChange} value={formData.firstName} required />
                </div>
                <div className="space-y-2">
                  <label htmlFor="last-name" className="text-sm font-medium">Last Name</label>
                  <Input id="last-name" name="lastName" type="text" onChange={handleChange} value={formData.lastName} required />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">Email</label>
                <Input id="email" name="email" type="email" onChange={handleChange} value={formData.email} required />
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium">Message</label>
                <Textarea id="message" name="message" onChange={handleChange} value={formData.message} required />
              </div>

              <Button type="submit">Send Message</Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
