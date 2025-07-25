'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import * as d3 from 'd3'

interface Node {
  id: string
  name: string
  type: 'skill' | 'project' | 'technology' | 'milestone'
  category: string
  x?: number
  y?: number
  fx?: number | null
  fy?: number | null
}

interface Link {
  source: string
  target: string
  strength: number
  type: 'primary' | 'secondary' | 'related'
}

interface NeuralSynapseThemeProps {
  intensity: 'static' | 'subtle' | 'full'
  isActive: boolean
}

export function NeuralSynapseTheme({ intensity, isActive }: NeuralSynapseThemeProps) {
  const svgRef = useRef<SVGSVGElement>(null)
  const simulationRef = useRef<d3.Simulation<Node, Link> | null>(null)
  const [selectedNode, setSelectedNode] = useState<Node | null>(null)
  const [hoveredNode, setHoveredNode] = useState<Node | null>(null)

  // Sample data representing the developer's skillset and projects
  const nodes: Node[] = [
    // Core Technologies
    { id: 'react', name: 'React', type: 'technology', category: 'frontend' },
    { id: 'nextjs', name: 'Next.js', type: 'technology', category: 'frontend' },
    { id: 'typescript', name: 'TypeScript', type: 'technology', category: 'language' },
    { id: 'nodejs', name: 'Node.js', type: 'technology', category: 'backend' },
    { id: 'python', name: 'Python', type: 'technology', category: 'language' },
    { id: 'cybersecurity', name: 'Cybersecurity', type: 'skill', category: 'security' },
    { id: 'ai-ml', name: 'AI/ML', type: 'skill', category: 'intelligence' },
    { id: 'blockchain', name: 'Blockchain', type: 'technology', category: 'emerging' },
    
    // Projects
    { id: 'portfolio', name: 'Digital Portfolio', type: 'project', category: 'web' },
    { id: 'fintech', name: 'FinTech Platform', type: 'project', category: 'finance' },
    { id: 'iot-security', name: 'IoT Security System', type: 'project', category: 'security' },
    { id: 'ai-recommendation', name: 'AI Recommendation Engine', type: 'project', category: 'ai' },
    
    // Skills
    { id: 'architecture', name: 'System Architecture', type: 'skill', category: 'design' },
    { id: 'leadership', name: 'Technical Leadership', type: 'skill', category: 'management' },
    { id: 'consulting', name: 'Security Consulting', type: 'skill', category: 'business' },
    
    // Milestones
    { id: 'niit-2004', name: 'NIIT Training (2004)', type: 'milestone', category: 'education' },
    { id: 'university-2015', name: 'University Graduate', type: 'milestone', category: 'education' },
    { id: 'certifications', name: 'Industry Certifications', type: 'milestone', category: 'achievement' }
  ]

  const links: Link[] = [
    // Technology connections
    { source: 'react', target: 'nextjs', strength: 0.9, type: 'primary' },
    { source: 'react', target: 'typescript', strength: 0.8, type: 'primary' },
    { source: 'nextjs', target: 'portfolio', strength: 0.9, type: 'primary' },
    { source: 'nodejs', target: 'fintech', strength: 0.8, type: 'primary' },
    { source: 'python', target: 'ai-ml', strength: 0.9, type: 'primary' },
    { source: 'ai-ml', target: 'ai-recommendation', strength: 0.9, type: 'primary' },
    { source: 'cybersecurity', target: 'iot-security', strength: 0.9, type: 'primary' },
    { source: 'cybersecurity', target: 'consulting', strength: 0.8, type: 'secondary' },
    { source: 'blockchain', target: 'fintech', strength: 0.7, type: 'secondary' },
    
    // Skill connections
    { source: 'architecture', target: 'fintech', strength: 0.6, type: 'related' },
    { source: 'architecture', target: 'iot-security', strength: 0.6, type: 'related' },
    { source: 'leadership', target: 'consulting', strength: 0.7, type: 'secondary' },
    
    // Milestone connections
    { source: 'niit-2004', target: 'cybersecurity', strength: 0.5, type: 'related' },
    { source: 'university-2015', target: 'architecture', strength: 0.6, type: 'related' },
    { source: 'certifications', target: 'cybersecurity', strength: 0.8, type: 'secondary' }
  ]

  useEffect(() => {
    if (!isActive || !svgRef.current) return

    const svg = d3.select(svgRef.current)
    const width = 800
    const height = 600

    // Clear previous content
    svg.selectAll('*').remove()

    // Create simulation
    const simulation = d3.forceSimulation<Node>(nodes)
      .force('link', d3.forceLink<Node, Link>(links)
        .id(d => d.id)
        .strength(d => d.strength)
        .distance(d => d.type === 'primary' ? 80 : 120))
      .force('charge', d3.forceManyBody()
        .strength(intensity === 'full' ? -300 : intensity === 'subtle' ? -150 : -50))
      .force('center', d3.forceCenter(width / 2, height / 2))
      .force('collision', d3.forceCollide().radius(30))

    simulationRef.current = simulation

    // Create links
    const link = svg.append('g')
      .selectAll('line')
      .data(links)
      .enter().append('line')
      .attr('stroke', d => 
        d.type === 'primary' ? '#00ff41' : 
        d.type === 'secondary' ? '#00ffff' : '#ff0080')
      .attr('stroke-opacity', 0.6)
      .attr('stroke-width', d => d.strength * 3)
      .style('filter', 'drop-shadow(0 0 3px currentColor)')

    // Create node groups
    const node = svg.append('g')
      .selectAll('g')
      .data(nodes)
      .enter().append('g')
      .style('cursor', 'pointer')
      .call(d3.drag<SVGGElement, Node>()
        .on('start', dragstarted)
        .on('drag', dragged)
        .on('end', dragended))

    // Add circles to nodes
    node.append('circle')
      .attr('r', d => 
        d.type === 'project' ? 20 : 
        d.type === 'skill' ? 15 : 
        d.type === 'technology' ? 12 : 10)
      .attr('fill', d => 
        d.type === 'project' ? '#ff0080' :
        d.type === 'skill' ? '#00ffff' :
        d.type === 'technology' ? '#00ff41' : '#ffff00')
      .attr('stroke', '#000')
      .attr('stroke-width', 2)
      .style('filter', 'drop-shadow(0 0 8px currentColor)')

    // Add labels
    node.append('text')
      .text(d => d.name)
      .attr('x', 0)
      .attr('y', 35)
      .attr('text-anchor', 'middle')
      .attr('fill', '#00ff41')
      .attr('font-size', '10px')
      .attr('font-family', 'JetBrains Mono, monospace')
      .style('text-shadow', '0 0 3px currentColor')

    // Mouse interactions
    node
      .on('mouseover', function(event, d) {
        setHoveredNode(d)
        
        // Highlight connected nodes
        const connectedNodeIds = new Set<string>()
        links.forEach(link => {
          if (link.source === d.id) connectedNodeIds.add(link.target)
          if (link.target === d.id) connectedNodeIds.add(link.source)
        })

        node.style('opacity', n => 
          n.id === d.id || connectedNodeIds.has(n.id) ? 1 : 0.3)
        link.style('opacity', l => 
          l.source === d.id || l.target === d.id ? 1 : 0.1)
      })
      .on('mouseout', function() {
        setHoveredNode(null)
        node.style('opacity', 1)
        link.style('opacity', 0.6)
      })
      .on('click', function(event, d) {
        setSelectedNode(d)
        
        // Fix node position at center
        d.fx = width / 2
        d.fy = height / 2
        simulation.alpha(0.3).restart()
      })

    // Mouse force for cursor interaction
    let mouseX = 0, mouseY = 0
    svg.on('mousemove', function(event) {
      [mouseX, mouseY] = d3.pointer(event)
      
      if (intensity === 'full') {
        simulation.force('mouse', d3.forceRadial(100, mouseX, mouseY).strength(0.1))
        simulation.alpha(0.1).restart()
      }
    })

    // Simulation tick
    simulation.on('tick', () => {
      link
        .attr('x1', d => (d.source as unknown as Node).x!)
        .attr('y1', d => (d.source as unknown as Node).y!)
        .attr('x2', d => (d.target as unknown as Node).x!)
        .attr('y2', d => (d.target as unknown as Node).y!)

      node
        .attr('transform', d => `translate(${d.x},${d.y})`)
    })

    function dragstarted(event: d3.D3DragEvent<SVGCircleElement, Node, Node>, d: Node) {
      if (!event.active) simulation.alphaTarget(0.3).restart()
      d.fx = d.x
      d.fy = d.y
    }

    function dragged(event: d3.D3DragEvent<SVGCircleElement, Node, Node>, d: Node) {
      d.fx = event.x
      d.fy = event.y
    }

    function dragended(event: d3.D3DragEvent<SVGCircleElement, Node, Node>, d: Node) {
      if (!event.active) simulation.alphaTarget(0)
      d.fx = null
      d.fy = null
    }

    return () => {
      simulation.stop()
    }
  }, [isActive, intensity])

  const closeNodeDetails = () => {
    setSelectedNode(null)
    if (simulationRef.current) {
      // Release all fixed positions
      nodes.forEach(node => {
        node.fx = null
        node.fy = null
      })
      simulationRef.current.alpha(0.3).restart()
    }
  }

  if (!isActive) return null

  return (
    <motion.div
      className="fixed inset-0 bg-black/95 z-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >
      {/* Neural Network Visualization */}
      <div className="w-full h-full flex items-center justify-center">
        <svg
          ref={svgRef}
          width="800"
          height="600"
          className="border border-green-500/30 rounded-lg"
          style={{ background: 'radial-gradient(circle, rgba(0,255,65,0.1) 0%, transparent 70%)' }}
        />
      </div>

      {/* Node Details Modal */}
      {selectedNode && (
        <motion.div
          className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 300 }}
        >
          <div className="bg-black/90 border border-green-500/50 rounded-lg p-6 max-w-md backdrop-blur-md">
            <h3 className="text-green-400 text-xl font-bold mb-2 font-mono">
              {selectedNode.name}
            </h3>
            <p className="text-green-300 mb-4 capitalize">
              {selectedNode.type} • {selectedNode.category}
            </p>
            <div className="text-green-200 text-sm mb-4">
              {selectedNode.type === 'project' && 
                'Click and drag to explore connections. This project demonstrates the intersection of multiple technologies and skills.'}
              {selectedNode.type === 'technology' && 
                'A core technology in the development stack. Hover over connected nodes to see relationships.'}
              {selectedNode.type === 'skill' && 
                'A professional competency developed through years of experience and continuous learning.'}
              {selectedNode.type === 'milestone' && 
                'A significant achievement in the professional journey, marking growth and development.'}
            </div>
            <button
              onClick={closeNodeDetails}
              className="bg-green-500/20 hover:bg-green-500/30 border border-green-500/50 text-green-400 px-4 py-2 rounded transition-colors font-mono"
            >
              Close
            </button>
          </div>
        </motion.div>
      )}

      {/* Hover Info */}
      {hoveredNode && !selectedNode && (
        <motion.div
          className="fixed bottom-8 left-8 bg-black/80 border border-green-500/30 rounded-lg p-4 backdrop-blur-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="text-green-400 font-mono text-sm">
            <div className="font-bold">{hoveredNode.name}</div>
            <div className="text-green-300 capitalize">
              {hoveredNode.type} • {hoveredNode.category}
            </div>
          </div>
        </motion.div>
      )}

      {/* Instructions */}
      <motion.div
        className="fixed top-8 left-8 bg-black/80 border border-green-500/30 rounded-lg p-4 backdrop-blur-md"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1 }}
      >
        <div className="text-green-400 font-mono text-sm">
          <div className="font-bold mb-2">Neural Synapse Network</div>
          <div className="text-green-300 space-y-1">
            <div>• Drag nodes to explore</div>
            <div>• Hover to highlight connections</div>
            <div>• Click for detailed information</div>
            <div>• Move cursor for gravitational effect</div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}
