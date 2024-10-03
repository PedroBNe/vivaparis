"use client"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText, Image, BookOpen, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function ContentDashboard() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow container mx-auto px-4 py-8 flex items-center justify-center">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <FileText className="h-5 w-5" />
                <span>Posts</span>
              </CardTitle>
              <CardDescription>Manage your blog posts</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">24</p>
              <p className="text-sm text-muted-foreground">Total posts</p>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                View Posts
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <FileText className="h-5 w-5" />
                <span>Blog</span>
              </CardTitle>
              <CardDescription>Manage your blog entries</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">12</p>
              <p className="text-sm text-muted-foreground">Published entries</p>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                View Blog
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Image className="h-5 w-5" />
                <span>Media</span>
              </CardTitle>
              <CardDescription>Manage your media files</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">56</p>
              <p className="text-sm text-muted-foreground">Total files</p>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                View Media
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <BookOpen className="h-5 w-5" />
                <span>Online Classes</span>
              </CardTitle>
              <CardDescription>Manage your online courses</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">8</p>
              <p className="text-sm text-muted-foreground">Active classes</p>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                View Classes
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        </div>
      </main>
    </div>
  )
}