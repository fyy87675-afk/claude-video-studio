import bpy
import math
import sys
import os
from mathutils import Vector

# =====================================================
# MADRASATI - Photorealistic School Environment
# Blender Cycles / Procedural Architecture
# =====================================================

args = sys.argv
hdri_path = None

if "--" in args:
    extra = args[args.index("--") + 1:]
    if extra:
        hdri_path = extra[0]

bpy.ops.object.select_all(action="SELECT")
bpy.ops.object.delete(use_global=False)

for block in bpy.data.materials:
    bpy.data.materials.remove(block)

# ---------------- MATERIALS ----------------

def material(name, color, roughness=0.7, metallic=0.0,
             texture=False):
    mat = bpy.data.materials.new(name)
    mat.diffuse_color = (*color, 1)
    mat.use_nodes = True

    nodes = mat.node_tree.nodes
    links = mat.node_tree.links
    bsdf = nodes.get("Principled BSDF")

    bsdf.inputs["Base Color"].default_value = (*color, 1)
    bsdf.inputs["Roughness"].default_value = roughness
    bsdf.inputs["Metallic"].default_value = metallic

    if texture:
        noise = nodes.new("ShaderNodeTexNoise")
        noise.inputs["Scale"].default_value = 38
        noise.inputs["Detail"].default_value = 4
        noise.inputs["Roughness"].default_value = 0.75

        bump = nodes.new("ShaderNodeBump")
        bump.inputs["Strength"].default_value = 0.16
        bump.inputs["Distance"].default_value = 0.035

        links.new(noise.outputs["Fac"], bump.inputs["Height"])
        links.new(bump.outputs["Normal"], bsdf.inputs["Normal"])

    return mat

concrete = material("Warm architectural concrete", (0.62, 0.59, 0.52), texture=True)
stone = material("Natural limestone", (0.76, 0.72, 0.63), texture=True)
dark = material("Graphite aluminium", (0.055, 0.075, 0.09), 0.28, 0.65)
glass = material("Reflective blue glass", (0.055, 0.17, 0.23), 0.12, 0.72)
gold = material("Champagne metal", (0.63, 0.43, 0.19), 0.27, 0.75)
asphalt = material("Road asphalt", (0.075, 0.085, 0.09), texture=True)
paving = material("Paving stone", (0.39, 0.38, 0.34), texture=True)
grass = material("Landscape grass", (0.095, 0.19, 0.085), texture=True)
wood = material("Tree bark", (0.17, 0.095, 0.045), texture=True)
leaf = material("Deep green foliage", (0.055, 0.17, 0.075), texture=True)
yellow = material("School bus yellow", (0.95, 0.55, 0.035), 0.3)
rubber = material("Tyre rubber", (0.018, 0.02, 0.022), 0.9)
white = material("Warm white paint", (0.88, 0.86, 0.78), 0.35)

# ---------------- GEOMETRY HELPERS ----------------

def cube(name, location, scale, mat, bevel=0.0):
    bpy.ops.mesh.primitive_cube_add(size=1, location=location)
    obj = bpy.context.object
    obj.name = name
    obj.dimensions = scale
    bpy.ops.object.transform_apply(location=False, rotation=False, scale=True)

    if mat:
        obj.data.materials.append(mat)

    if bevel:
        mod = obj.modifiers.new("Precision softened edges", "BEVEL")
        mod.width = bevel
        mod.segments = 3
        obj.modifiers.new("Weighted corner normals", "WEIGHTED_NORMAL")

    return obj


def cylinder(name, location, radius, depth, mat, vertices=32):
    bpy.ops.mesh.primitive_cylinder_add(
        vertices=vertices, radius=radius, depth=depth,
        location=location
    )
    obj = bpy.context.object
    obj.name = name
    obj.data.materials.append(mat)
    return obj


def sphere(name, location, scale, mat):
    bpy.ops.mesh.primitive_ico_sphere_add(
        subdivisions=3, radius=1, location=location
    )
    obj = bpy.context.object
    obj.name = name
    obj.scale = scale
    obj.data.materials.append(mat)
    return obj


# ---------------- SCHOOL BUILDING ----------------

# Main structure
cube("Main school structure", (0, 0, 7), (34, 17, 14), concrete, 0.18)

# Architectural floor bands
for z in (4.7, 9.2, 13.65):
    cube("Horizontal facade architectural band",
         (0, -8.63, z), (34.3, 0.32, 0.22), gold, 0.035)

# Stone entrance feature
cube("Entrance stone portal", (0, -8.85, 3.5),
     (8.2, 0.65, 7.0), stone, 0.12)

# Entrance glazing and door frames
cube("Main entrance glass", (0, -9.22, 3.1),
     (5.0, 0.12, 5.6), glass, 0.035)

for x in (-2.55, 0, 2.55):
    cube("Entrance aluminium mullion",
         (x, -9.32, 3.1), (0.09, 0.12, 5.7), dark)

cube("Entrance horizontal frame", (0, -9.33, 3.3),
     (5.1, 0.13, 0.1), gold)

# Three floors of realistic window modules
for z in (3.0, 7.5, 12.0):
    for x in (-13, -9, -5, 5, 9, 13):
        cube("Window recessed dark frame",
             (x, -8.68, z), (2.75, 0.22, 2.65), dark, 0.035)

        cube("Reflective window glazing",
             (x, -8.82, z), (2.49, 0.055, 2.38), glass, 0.018)

        cube("Window vertical mullion",
             (x, -8.87, z), (0.055, 0.06, 2.4), gold)

        cube("Window horizontal mullion",
             (x, -8.87, z), (2.5, 0.06, 0.055), gold)

# Roof edge and canopy
cube("Roof crown", (0, 0, 14.15), (35, 18, 0.65), dark, 0.12)
cube("Entrance floating canopy", (0, -10.3, 7.0),
     (10.5, 3.0, 0.32), dark, 0.12)

for x in (-4.5, 4.5):
    cube("Canopy support column", (x, -10.3, 3.5),
         (0.3, 0.35, 7), gold, 0.06)

# Entrance stairs
for i in range(5):
    cube("Wide entrance step",
         (0, -10.3 - i * 0.65, 0.25 + i * 0.25),
         (9, 0.9, 0.45), stone, 0.045)

# Architectural side fins
for x in (-16.5, 16.5):
    cube("Facade vertical architectural fin",
         (x, -8.9, 7), (0.45, 0.55, 14), dark, 0.06)

# ---------------- GROUND AND LANDSCAPE ----------------

cube("Large landscape ground", (0, 0, -0.35),
     (180, 150, 0.5), grass)

cube("School forecourt paving", (0, -20, -0.04),
     (65, 25, 0.25), paving, 0.08)

cube("Front access road", (0, -39, -0.12),
     (100, 12, 0.2), asphalt, 0.04)

# Pavement joints
for x in range(-30, 31, 3):
    cube("Paving joint", (x, -20, 0.095),
         (0.025, 24, 0.008), dark)

# Trees
def create_tree(x, y, height):
    cylinder("Tree trunk", (x, y, height * 0.35),
             0.25, height * 0.7, wood, 16)

    sphere("Tree crown lower", (x, y, height * 0.83),
           (1.55, 1.45, 1.65), leaf)

    sphere("Tree crown upper", (x + 0.45, y, height * 1.12),
           (1.15, 1.2, 1.35), leaf)

for x, y, h in (
    (-23, -5, 6), (-20, -15, 5),
    (23, -5, 6), (20, -15, 5),
    (-24, 8, 6), (24, 8, 6)
):
    create_tree(x, y, h)

# Landscape planter boxes
for x in (-19, 19):
    cube("Stone landscape planter", (x, -13, 0.55),
         (5, 2.0, 1.1), stone, 0.12)

# ---------------- SCHOOL BUS ----------------

# Bus body: front faces toward camera (-Y)
bx, by = 12, -24

cube("School bus lower body", (bx, by, 1.65),
     (3.6, 8.5, 2.6), yellow, 0.35)

cube("School bus upper body", (bx, by, 3.05),
     (3.55, 7.9, 1.25), yellow, 0.25)

# Bus front windscreen
cube("Bus front windshield", (bx, by - 4.29, 3.1),
     (3.0, 0.08, 1.0), glass, 0.08)

# Side windows
for y in (-2.7, -0.7, 1.3, 3.1):
    cube("Bus side window", (bx + 1.83, by + y, 3.1),
         (0.07, 1.55, 0.85), glass, 0.055)

# Bus wheels
for y in (-2.8, 2.8):
    for x in (-1.85, 1.85):
        wheel = cylinder("Bus tyre", (bx + x, by + y, 0.9),
                         0.68, 0.32, rubber)
        wheel.rotation_euler[1] = math.pi / 2

        hub = cylinder("Bus wheel hub",
                       (bx + x * 1.09, by + y, 0.9),
                       0.29, 0.04, gold, 32)
        hub.rotation_euler[1] = math.pi / 2

# Headlights
for x in (-1.15, 1.15):
    sphere("Bus headlight", (bx + x, by - 4.38, 1.45),
           (0.27, 0.09, 0.22), white)

# Bus bumper
cube("Bus front bumper", (bx, by - 4.4, 1.0),
     (3.3, 0.25, 0.25), dark, 0.08)

# ---------------- LIGHTING / HDRI ----------------

world = bpy.data.worlds.new("Real world sky") if not bpy.data.worlds else bpy.data.worlds[0]
bpy.context.scene.world = world
world.use_nodes = True

nodes = world.node_tree.nodes
links = world.node_tree.links
nodes.clear()

output = nodes.new("ShaderNodeOutputWorld")
background = nodes.new("ShaderNodeBackground")

if hdri_path:
    env = nodes.new("ShaderNodeTexEnvironment")
    env.image = bpy.data.images.load(hdri_path, check_existing=True)
    links.new(env.outputs["Color"], background.inputs["Color"])
    background.inputs["Strength"].default_value = 0.65
else:
    background.inputs["Color"].default_value = (0.22, 0.3, 0.42, 1)
    background.inputs["Strength"].default_value = 0.5

links.new(background.outputs["Background"], output.inputs["Surface"])

bpy.ops.object.light_add(type="SUN", location=(-25, -30, 35))
sun = bpy.context.object
sun.name = "Cinematic afternoon sunlight"
sun.data.energy = 3.0
sun.data.angle = math.radians(18)
sun.rotation_euler = (math.radians(25), math.radians(-28), math.radians(-32))

# ---------------- CAMERA ----------------

bpy.ops.object.camera_add(location=(37, -55, 28))
camera = bpy.context.object
target = Vector((0, -5, 5))
direction = target - camera.location
camera.rotation_euler = direction.to_track_quat("-Z", "Y").to_euler()
camera.data.lens = 48
bpy.context.scene.camera = camera

# ---------------- RENDER SETTINGS ----------------

scene = bpy.context.scene
scene.render.engine = "CYCLES"
scene.cycles.samples = 48
scene.cycles.use_denoising = True
scene.cycles.max_bounces = 8
scene.cycles.diffuse_bounces = 3
scene.cycles.glossy_bounces = 4

scene.render.resolution_x = 1440
scene.render.resolution_y = 1800
scene.render.resolution_percentage = 100

scene.render.image_settings.file_format = "PNG"
scene.render.image_settings.color_mode = "RGBA"
output_dir = os.path.join(os.getcwd(), "output")
os.makedirs(output_dir, exist_ok=True)
scene.render.filepath = os.path.join(output_dir, "madrasati-school-test.png")

scene.view_settings.view_transform = "AgX"
scene.render.film_transparent = False

# Save project and render
bpy.ops.wm.save_as_mainfile(filepath=os.path.join(output_dir, "madrasati-school.blend"))
bpy.ops.render.render(write_still=True)

print("MADRASATI BLENDER SCENE COMPLETE")
