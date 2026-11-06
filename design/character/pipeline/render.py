import bpy, sys, math
S, src, out = sys.argv[1], sys.argv[2], sys.argv[3]
bpy.ops.wm.read_factory_settings(use_empty=True)
bpy.ops.import_scene.gltf(filepath=src)
sc=bpy.context.scene
sc.render.engine='CYCLES'; sc.cycles.device='CPU'; sc.cycles.samples=16; sc.cycles.use_denoising=False
sc.render.resolution_x=420; sc.render.resolution_y=560
w=bpy.data.worlds.new('w'); sc.world=w; w.use_nodes=True; w.node_tree.nodes['Background'].inputs[0].default_value=(.9,.9,.88,1); w.node_tree.nodes['Background'].inputs[1].default_value=1.0
bpy.ops.object.light_add(type='SUN', rotation=(math.radians(50),0,math.radians(30))); bpy.context.object.data.energy=2.5
cam=bpy.data.objects.new('cam', bpy.data.cameras.new('cam')); sc.collection.objects.link(cam); sc.camera=cam
cam.data.type='ORTHO'
ms=[o for o in sc.objects if o.type=='MESH']
zs=[(o.matrix_world@v.co).z for o in ms for v in list(o.data.vertices)[::50]]; cz=(min(zs)+max(zs))/2
cam.data.ortho_scale=1.25*(max(zs)-min(zs))
for i,a in enumerate([0,90,180,35]):
    r=math.radians(a); cam.location=(3*math.sin(r), -3*math.cos(r), cz); cam.rotation_euler=(math.radians(90),0,r)
    sc.render.filepath=f'{out}_{i}.png'; bpy.ops.render.render(write_still=True)
